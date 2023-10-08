import {
  AUTH,
  LOGOUT,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import { produce } from "immer";
import Cookie from "js-cookie";
const authReducer = (state = { authData: null, isLoading: true }, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case START_LOADING:
        draftState.isLoading = true;
        break;
      case END_LOADING:
        draftState.isLoading = false;
        break;
      case AUTH:
        if (action?.data?.token) {
          Cookie.set("jwt", action?.data?.token);
        }
        if (action?.data?.refreshToken) {
          Cookie.set("refresh", action?.data?.refreshToken);
        }
        draftState.authData = action?.data;
        break;
      case LOGOUT:
        Cookie.remove("jwt");
        Cookie.remove("refresh");
        draftState.authData = action?.data;
        break;
      default:
        break;
    }
  });
};

export default authReducer;
