import {
  AUTH,
  LOGOUT,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import Cookie from "js-cookie";
const authReducer = (state = { authData: null, isLoading: true }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case AUTH:
      if (action?.data?.token) {
        Cookie.set("jwt", action?.data?.token);
      }
      if (action?.data?.refreshToken) {
        Cookie.set("refresh", action?.data?.refreshToken);
      }
      return { ...state, authData: action?.data };
    case LOGOUT:
      Cookie.remove("jwt");
      Cookie.remove("refresh");
      return { ...state, authData: action?.data };
    default:
      return state;
  }
};

export default authReducer;
