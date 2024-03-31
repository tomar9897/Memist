import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getUser = (userId) => API.get(`/user/${userId}`);
export const getFollowers = (userId) => API.get(`/user/${userId}/getFollowers`);
export const getFollowing = (userId) => API.get(`/user/${userId}/getFollowing`);

export const approvePost = (id) => API.get(`/user/approvePost/${id}`);
export const getAllUser = () => API.get("/user");
export const deleteUser = (userId) => API.get(`/user/${userId}`);

export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
