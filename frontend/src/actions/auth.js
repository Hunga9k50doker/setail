import * as api from "../api";
import { AUTH, START_LOADING, END_LOADING } from "../constants/actionTypes";
import { toast } from "react-toastify";
export const login = (formData, callback) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, data });
    window.location.reload();
    toast.success("Successfully!");
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const verifyUser = (formData, callback) => async (dispatch) => {
  try {
    const { data } = await api.verifyUser(formData);
    dispatch({ type: AUTH, data });
    toast.success("Successfully!");
    window.location.reload();
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const register = (formData, callback) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, data });
    toast.success("Successfully!");
    window.location.reload();
  } catch (error) {
    toast.error(error.response.data);
  }
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
