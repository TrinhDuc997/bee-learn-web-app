import axiosClient from "./general-api";

export const authAPI = {
  login(payload: any, version = "v1"): Promise<any> {
    return axiosClient.post(`/${version}/user/login`, payload);
  },
  logOut() {
    return axiosClient.post("/logout");
  },
  userRegistration(req?: any, version = "v1") {
    return axiosClient.post(`/${version}/user/addUser`, req);
  },
};
