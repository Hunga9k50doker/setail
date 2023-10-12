import * as api from "../api";
import {
  AUTH,
  START_LOADING,
  END_LOADING,
  GET_CART_BY_ID,
} from "../constants/actionTypes";
import { toast } from "react-toastify";
export const login = (formData, callback) => async (dispatch) => {
  await api
    .signin(formData)
    .then((res) => {
      dispatch({ type: AUTH, data: res.data });
      window.location.reload();
      toast.success("Successfully!");
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const verifyUser = (formData) => async (dispatch) => {
  await api
    .verifyUser(formData)
    .then((res) => {
      dispatch({ type: AUTH, data: res.data });
      toast.success("Successfully!");
      window.location.reload();
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const getMyProfile = async (dispatch) => {
  await api
    .getProfile()
    .then(async (res) => {
      dispatch({ type: AUTH, data: res.data });
      await api
        .getCartByUserId({ userId: res.data?.result?._id })
        .then((res) => {
          dispatch({ type: GET_CART_BY_ID, payload: { cart: res.data } });
        });
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
    });
};

export const register = (formData, callback) => async (dispatch) => {
  const { data } = await api
    .signup(formData)
    .then((res) => {
      dispatch({ type: AUTH, data });
      toast.success("Successfully!");
      window.location.reload();
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const updateProfile = (formData, callback) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateProfile(formData);
    await dispatch({ type: AUTH, data });
    toast.success("Successfully!");
    dispatch({ type: END_LOADING });
    callback.push("/");
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: END_LOADING });
  }
};

export const updatePassword = (formData, callback) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updatePassword(formData);
    await dispatch({ type: AUTH, data });
    toast.success("Successfully!");
    dispatch({ type: END_LOADING });
    callback.push("/");
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: END_LOADING });
  }
};
