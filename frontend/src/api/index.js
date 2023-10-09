import axios from "axios";
import Cookies from "js-cookie";
const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // timeout: 12000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const token = Cookies.get("jwt");
  const refresh = Cookies.get("refresh");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    req.headers.refresh = refresh;
  }
  return req;
});

export const fetchCards = (params) => API.get("/cards", { params });
export const searchCard = (params) => API.get("/search", { params });
export const getCardById = (id) => API.get(`/cards/${id}`);
export const createCard = (newCard) => API.post("/cards", newCard);
export const deleteCard = (id) => API.delete(`/cards/${id}`);
export const updateCard = (id, newData) => API.patch(`/cards/${id}`, newData);
export const updateReviewCard = (id, newData) =>
  API.patch(`/cards/${id}/review`, newData);

export const fetchProducts = (params) => API.get("/products", { params });
export const searchProduct = (params) => API.get("/search", { params });
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (newProduct) => API.post("/products", newProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (id, newData) =>
  API.patch(`/products/${id}`, newData);
export const updateReviewProduct = (id, newData) =>
  API.patch(`/products/${id}/review`, newData);

export const fetchTours = (userId) => API.post("/tours/my-tour", userId);
export const getTourById = (id) => API.get(`/tours/${id}`);
export const createTour = (newTour) => API.post("/tours", newTour);

export const signin = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);
export const verifyUser = (formData) => API.post("/user/verify/user", formData);
export const getProfile = () => API.get("/user/getProfile");
export const updateProfile = (formData) =>
  API.post("/user/update/profile", formData);
export const updatePassword = (formData) =>
  API.post("/user/update/password", formData);
