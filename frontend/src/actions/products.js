import * as api from "../api";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  START_LOADING,
  END_LOADING,
  UPDATE_REVIEW_PRODUCT,
  SEARCH_PRODUCTS,
} from "../constants/actionTypes";
import { toast } from "react-toastify";

export const getProducts = (params) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchProducts(params);
    dispatch({ type: END_LOADING });
    dispatch({ type: GET_ALL_PRODUCTS, payload: { data } });
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const searchProduct = (params) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.searchProduct(params);
    dispatch({ type: END_LOADING });
    dispatch({ type: SEARCH_PRODUCTS, payload: { data } });
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const getProductById = (slug) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.getProductById(slug);
    dispatch({ type: GET_PRODUCT_BY_ID, payload: { product: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createProduct(product);
    dispatch({ type: END_LOADING });
    dispatch({ type: CREATE_PRODUCT, payload: { data } });
    toast.success("Successfully!");
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const updateProduct = (id, newData, callBack) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.updateProduct(id, newData);
    dispatch({ type: UPDATE_PRODUCT, payload: data });
    dispatch({ type: END_LOADING });
    toast.success("Successfully!");
    callBack.goBack();
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const updateReviewProduct = (id, newData) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.updateReviewProduct(id, newData);
    dispatch({ type: UPDATE_REVIEW_PRODUCT, payload: { product: data } });
    dispatch({ type: END_LOADING });
    toast.success("Successfully!");
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    await api.deleteProduct(id);
    dispatch({ type: DELETE_PRODUCT, payload: id });
    dispatch({ type: END_LOADING });
    toast.success("Successfully!");
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};
