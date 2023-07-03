import { authAPI } from "@api-client";
import { IUser } from "@interfaces";
import axiosClient from "api-client/general-api";
import axios from "axios";
import Cookies from "js-cookie";
// import axiosClient from "api-client/general-api";
import useSWR from "swr";

// const fetcher = async (url: string, token: string) => {
//   const options = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${Cookies.get("access_token")}`,
//     },
//   };
//   return axios.post(url, options).then((res) => res.data);
// };
const fetcher = (url: string) => axiosClient.get(url);
export function useAuth() {
  const { data, error, isLoading, mutate } = useSWR("profile", fetcher);
  async function login(username: string, password: string) {
    const authData = await authAPI.login({
      username,
      password,
    });
    mutate(authData, true);
    return authData;
  }
  async function logout() {
    await authAPI.logOut();
    mutate(undefined, false);
  }
  function updateProfile(newFields: any) {
    // Update specific fields in the profile object
    if (newFields) {
      const updatedProfile = { ...data, ...newFields };
      mutate(updatedProfile, true); // Update profile with new fields
      // useSWR("profile", fetcher);
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
