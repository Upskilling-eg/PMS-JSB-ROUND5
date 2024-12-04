import axios from "axios";

export const baseURL = `https://upskilling-egypt.com:3003/api/v1`;
export const BASE_IMG_URL = "https://upskilling-egypt.com:3003";

export const requestHeader = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const publicAxiosInstance = axios.create({ baseURL });
export const privateAxiosInstance = axios.create({ baseURL });

privateAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // !token | expired | refresh token
  if (!token) {
    window.location.href = "/login";
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AUTHURLS = {
  loginUrl: `${baseURL}/Users/Login`,
  forgetUrl: `${baseURL}/Users/Reset/Request`,
  resetUrl: `${baseURL}/Users/Reset`,
  changePassUrl: `${baseURL}/Users/ChangePassword`,
  registerUrl: `${baseURL}/Users/Register`,
  verifyAccountUrl: `${baseURL}/Users/verify`,
};

export const PROJECTSURLS = {
  getAll: `${baseURL}/Project/manager`,
  addUrl: `${baseURL}/Project`,
  // deleteUrl(id) :`${baseURL}/Project/${id}`,
};
export const TASKSURLS = {
  getAll: `${baseURL}/Task/manager`,
  addUrl: `${baseURL}/Task`,
  updateUrl: (id: string) => `${baseURL}/Task/${id}`,
  GET_ASSIGNED_TASKS: `${baseURL}/Task`,
  CHANGE_STATUS: (id: string) => `${baseURL}/Task/${id}/change-status`,
};
export const USERSSURLS = {
  getUsersUrl: `${baseURL}/Users/Manager`,
  toggleStatusUrl: (id: number) => `${baseURL}/Users/${id}`,
};
