import { authAPI } from "@api-client";
import axiosClient from "api-client/general-api";
import useSWR from "swr";
import { useRouter } from "next/router";
const fetcher = (url: string) => axiosClient.get(url);
export function useAuth() {
  const { data, error, isLoading, mutate } = useSWR("profile", fetcher, {
    shouldRetryOnError: false,
    dedupingInterval: 60 * 60 * 1000,
  });
  const router = useRouter();

  async function login(username: string, password: string) {
    const authData = await authAPI.login({
      username,
      password,
    });
    mutate(authData, false);

    if (
      typeof window !== "undefined" &&
      (window.history.state === null || window.history.state.as === "/login")
    ) {
      router.push("/");
    } else {
      router.back();
    }
  }
  async function logout() {
    await authAPI.logOut();
    mutate(undefined, false);
    router.push("/login");
  }
  function updateProfile(newFields: any) {
    // Update specific fields in the profile object
    if (newFields) {
      const updatedProfile = { ...data, ...newFields };
      mutate(updatedProfile, false); // Update profile with new fields
    }
  }

  return {
    profile: data as any,
    error,
    isLoading,
    login,
    logout,
    updateProfile,
  };
}
