import axios from "axios";

const feat1AxiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // Accept: "application/json, application/xml",
    // can add Authorization Bearer tokens below once login is done
  },
});

const feat2AxiosInstance = axios.create({
  baseURL: "http://localhost:3002/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // Accept: "application/json, application/xml",
    // can add Authorization Bearer tokens below once login is done
  },
});

export { feat1AxiosInstance, feat2AxiosInstance };
