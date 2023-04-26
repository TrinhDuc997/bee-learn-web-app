import { authAPI } from "@api-client";
import axiosClient from "api-client/general-api";
import useSWR from "swr";
import { PublicConfiguration } from "swr/dist/types";

// const fetcher = (url: string) => axiosClient.get(url);
export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR("/v1/user/profile", {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    // shouldRetryOnError: true,
  });
  const firstLoading = profile === undefined && error === undefined;
  async function login(username: string, password: string) {
    const authData = await authAPI.login({
      username,
      password,
    });
    mutate();
    return authData;
  }
  async function logout() {
    await authAPI.logOut();
    mutate({}, false);
  }
  return {
    profile,
    error,
    login,
    logout,
    firstLoading,
  };
}
