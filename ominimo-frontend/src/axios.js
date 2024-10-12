import Cookies from "js-cookie";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${sessionStorage.getItem(
    "auth_token"
  )}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 419) {
      sessionStorage.removeItem("auth_token");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const breezeClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const addCsrfToken = async () => {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    withCredentials: true,
  });
};

breezeClient.interceptors.request.use(async (config) => {
  let token = Cookies.get("XSRF-TOKEN");
  if (!token) {
    await addCsrfToken();
    token = Cookies.get("XSRF-TOKEN");
  }
  if (token) {
    config.headers["X-XSRF-TOKEN"] = token;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

export const login = async (credentials) => {
  const response = await breezeClient.post("/login", credentials);
  return response.data;
};

export const register = async (credentials) => {
  const response = await breezeClient.post("/register", credentials);
  return response.data;
};

export const getUser = async () => {
  const response = await apiClient.get("/user");
  return response.data;
};

export const getPosts = async () => {
  const response = await apiClient.get("/posts");
  return response.data;
};

export const getPost = async (postId) => {
  const response = await apiClient.get(`/posts/${postId}`);
  return response.data;
};

export const createNewPost = async (data, user_id) => {
  data.user_id = user_id;
  const response = await breezeClient.post("/api/posts", data);
  return response.data;
};

export const updatePost = async (postId, data) => {
  const response = await breezeClient.put(`/api/posts/${postId}`, data);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await breezeClient.delete(`/api/posts/${postId}`);
  return response.data;
};

export const addComment = async (postId, data) => {
  const response = await breezeClient.post(
    `/api/posts/${postId}/comments`,
    data
  );
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await breezeClient.delete(`/api/comments/${commentId}`);
  return response.data;
};

export { apiClient, breezeClient };
