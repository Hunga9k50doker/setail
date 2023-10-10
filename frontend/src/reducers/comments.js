/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import {
  CREATE_COMMENT,
  GET_ALL_COMMENTS,
  GET_COMMENT_BY_ID,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  END_LOADING,
  START_LOADING,
} from "../constants/actionTypes";
import { produce } from "immer";

const initialState = { isLoading: true, comments: [], comment: null };

const reducer = (state = initialState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case START_LOADING:
        draftState.isLoading = true;
        break;
      case END_LOADING:
        draftState.isLoading = false;
        break;
      case GET_ALL_COMMENTS:
        draftState.comments = action.payload.data;
        break;
      case GET_COMMENT_BY_ID:
        draftState.comment = action.payload.comment;
        break;
      case CREATE_COMMENT:
        draftState.comments.push(action.payload);
        break;
      case UPDATE_COMMENT:
        const index = draftState.comments.items.findIndex(
          (comment) => comment._id === action.payload
        );
        if (index !== -1) {
          draftState.comments.items[index] = action.payload;
        }
        break;
      case DELETE_COMMENT:
        draftState.comments = draftState.comments.items.filter(
          (comment) => comment._id !== action.payload
        );
        break;
      default:
        break;
    }
  });
};

export default reducer;
