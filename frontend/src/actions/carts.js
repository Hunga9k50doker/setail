import * as api from "../api";
import {
  CREATE_CART,
  DELETE_CART,
  UPDATE_CART,
  GET_ALL_CARTS,
  GET_CART_BY_ID,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import { toast } from "react-toastify";

export const getCarts = (userId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchCarts(userId);
    dispatch({ type: END_LOADING });
    dispatch({ type: GET_ALL_CARTS, payload: { data } });
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const getCartById = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.getCartById(id);
    dispatch({ type: GET_CART_BY_ID, payload: { cart: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const createCart = (cart) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createCart(cart);
    dispatch({ type: END_LOADING });
    dispatch({ type: CREATE_CART, payload: data });
    toast.success("Successfully!");
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const updateCart = (id, newData, callBack) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.updateCart(id, newData);
    dispatch({ type: UPDATE_CART, payload: data });
    dispatch({ type: END_LOADING });
    toast.success("Successfully!");
    callBack.goBack();
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const deleteCart = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    await api.deleteCart(id);
    dispatch({ type: DELETE_CART, payload: id });
    dispatch({ type: END_LOADING });
    toast.success("Successfully!");
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};
