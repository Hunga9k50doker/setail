import * as api from "../api";
import { CREATE_CARD, DELETE_CARD, UPDATE_CARD, GET_ALL_CARDS, GET_CARD_BY_ID, START_LOADING, END_LOADING } from "../constants/actionTypes";
import { toast } from "react-toastify";

export const getCards = async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchCards();
    dispatch({ type: END_LOADING });
    dispatch({ type: GET_ALL_CARDS, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

export const getCardById = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.getCardById(id);
    dispatch({ type: GET_CARD_BY_ID, payload: { card: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error.message);
    toast.error(error.message);
  }
};

export const createCard = (card) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createCard(card);
    dispatch({ type: END_LOADING });
    dispatch({ type: CREATE_CARD, payload: { data } });
    toast.success("Successfully!");
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error);
    toast.error(error.message);
  }
};

export const updateCard = (id, newData, callBack) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.updateCard(id, newData);
    dispatch({ type: UPDATE_CARD, payload: data });
    dispatch({ type: END_LOADING });
    toast.success("Successfully!");
    callBack.goBack();
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error.message);
    toast.error(error.message);
  }
};

export const deleteCard = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    await api.deleteCard(id);
    dispatch({ type: DELETE_CARD, payload: id });
    dispatch({ type: END_LOADING });
    toast.success("Successfully!");
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error.message);
    toast.error(error.message);
  }
};
