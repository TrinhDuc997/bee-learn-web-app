import { authAPI } from "@api-client";
import axiosClient from "api-client/general-api";
// import axiosClient from "api-client/general-api";
import useSWR from "swr";

// const fetcher = (url: string) => axiosClient.get(url);
export function useAuth() {
  const {
    data: profile,
    error,
    isLoading,
    mutate,
  } = useSWR("profile", {
    dedupingInterval: 60 * 60 * 1000,
    // revalidateOnFocus: false,
    refreshInterval: 2000,

    shouldRetryOnError: true,
  });
  const firstLoading = profile === undefined && error === undefined;
  async function login(username: string, password: string) {
    const authData = await authAPI.login({
      username,
      password,
    });
    // const { token } = authData;
    // const getProfile = await axiosClient.get("/profile"),{

    // };
    mutate(authData);
    return authData;
  }
  async function logout() {
    await authAPI.logOut();
    mutate({}, true);
  }
  function updateProfile(newFields: any) {
    // Update specific fields in the profile object
    if (profile) {
      const updatedProfile = { ...profile, ...newFields };
      mutate(updatedProfile, false); // Update profile with new fields
    }
  }

  return {
    profile,
    error,
    isLoading,
    login,
    logout,
    updateProfile,
    firstLoading,
  };
}
