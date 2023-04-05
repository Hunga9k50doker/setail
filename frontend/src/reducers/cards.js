import { CREATE_CARD, DELETE_CARD, UPDATE_CARD, GET_ALL_CARDS, GET_CARD_BY_ID } from "../constants/actionTypes";

export default (cards = [], action) => {
  switch (action.type) {
    case GET_ALL_CARDS:
      return action.payload;
    case CREATE_CARD:
      return [...cards, action.payload];
    default:
      return cards;
  }
};
