import axios from "axios";

const axiosClient = axios.create({
  baseURL: typeof window !== "undefined" ? "/api" : process.env.TARGET_API, // if the API is called from server then get the URL API from the file env
  headers: {
    "Content-type": "application/json; charset=utf-8",
  },
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axiosClient;
