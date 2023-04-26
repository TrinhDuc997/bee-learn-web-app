import axiosClient from "./general-api";

export const authAPI = {
  login(payload: any): Promise<any> {
    return axiosClient.post("/login", payload);
  },
  logOut() {
    return axiosClient.post("/logout");
  },
};
