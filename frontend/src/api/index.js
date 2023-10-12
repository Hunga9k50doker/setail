import axios from "axios";
import Cookies from "js-cookie";
const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
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
export const getProductById = (slug) => API.get(`/products/${slug}`);
export const createProduct = (newProduct) => API.post("/products", newProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (id, newData) =>
  API.patch(`/products/${id}`, newData);
export const updateReviewProduct = (id, newData) =>
  API.patch(`/products/${id}/review`, newData);

export const fetchTours = (params) => API.get("/tours/my-tour", { params });
export const getTourById = (id) => API.get(`/tours/${id}`);
export const createTour = (newTour) => API.post("/tours", newTour);

export const fetchCarts = () => API.get("/carts/");
export const getCartByUserId = (params) => API.get(`/carts/`, { params });
export const createCart = (newCart) => API.post("/carts/", newCart);
export const deleteCart = (params) => API.delete(`/carts`, { params });
export const updateCart = (id, newData) => API.patch(`/carts/${id}`, newData);

export const fetchComments = (params) => API.get("/comments", { params });
export const getCommentById = (id) => API.get(`/comments/${id}`);
export const createComment = (newComment) => API.post("/comments", newComment);
export const deleteComment = (id) => API.delete(`/comments/${id}`);
export const updateComment = (id, newData) =>
  API.patch(`/comments/${id}`, newData);

export const signin = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);
export const verifyUser = (formData) => API.post("/user/verify/user", formData);
export const getProfile = () => API.get("/user/getProfile");
export const updateProfile = (formData) =>
  API.post("/user/update/profile", formData);
export const updatePassword = (formData) =>
  API.post("/user/update/password", formData);
