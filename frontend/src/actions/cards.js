import * as api from "../api";
import { CREATE_CARD, DELETE_CARD, UPDATE_CARD, GET_ALL_CARDS, GET_CARD_BY_ID } from "../constants/actionTypes";
import { toast } from "react-toastify";
export const getCards = async (dispatch) => {
  try {
    const { data } = await api.fetchCards();
    dispatch({ type: GET_ALL_CARDS, payload: data });
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

export const createCard = (card) => async (dispatch) => {
  try {
    const { data } = await api.createCard(card);
    dispatch({ type: CREATE_CARD, payload: data });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
