import * as api from "../api";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  GET_ALL_COMMENTS,
  GET_COMMENT_BY_ID,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import { toast } from "react-toastify";

export const getComments = (params) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchComments(params);
    dispatch({ type: END_LOADING });
    dispatch({ type: GET_ALL_COMMENTS, payload: { data } });
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const getCommentById = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.getCommentById(id);
    dispatch({ type: GET_COMMENT_BY_ID, payload: { comment: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const createComment = (comment) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createComment(comment);
    dispatch({ type: END_LOADING });
    dispatch({ type: CREATE_COMMENT, payload: data });
    toast.success("Successfully!");
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const updateComment = (id, newData, callBack) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.updateComment(id, newData);
    dispatch({ type: UPDATE_COMMENT, payload: data });
    dispatch({ type: END_LOADING });
    toast.success("Successfully!");
    callBack.goBack();
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const deleteComment = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    await api.deleteComment(id);
    dispatch({ type: DELETE_COMMENT, payload: id });
    dispatch({ type: END_LOADING });
    toast.success("Successfully!");
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};
