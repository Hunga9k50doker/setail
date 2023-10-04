import axios from "axios";

// axios.defaults.withCredentials = true;
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  // timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchCards = () => API.get("/cards");
export const getCardById = (id) => API.get(`/cards/${id}`);
export const createCard = (newCard) => API.post("/cards", newCard);
export const deleteCard = (id) => API.delete(`/cards/${id}`);
export const updateCard = (id, newData) => API.patch(`/cards/${id}`, newData);
export const updateReviewCard = (id, newData) =>
  API.patch(`/cards/${id}/review`, newData);

export const fetchTours = (userId) => API.post("/tours/my-tour", userId);
export const getTourById = (id) => API.get(`/tours/${id}`);
export const createTour = (newTour) => API.post("/tours", newTour);

export const signin = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);
export const verifyUser = (formData) => API.post("/user/verify/user", formData);
export const updateProfile = (formData) =>
  API.post("/user/update/profile", formData);
export const updatePassword = (formData) =>
  API.post("/user/update/password", formData);
