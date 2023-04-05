import * as api from "../api";
import { AUTH } from "../constants/actionTypes";
import { toast } from "react-toastify";
export const login = (formData, callback) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, data });
    window.location.reload();
    toast.success("Successfully!");
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

export const register = (formData, callback) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, data });
    toast.success("Successfully!");
    window.location.reload();
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
