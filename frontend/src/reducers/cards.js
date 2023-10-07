/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import {
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD,
  GET_ALL_CARDS,
  GET_CARD_BY_ID,
  END_LOADING,
  START_LOADING,
  UPDATE_REVIEW_CARD,
  SEARCH_CARDS,
} from "../constants/actionTypes";

export default (state = { isLoading: true, cards: [], card: null }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case GET_ALL_CARDS:
      return { ...state, cards: action.payload.data };
    case SEARCH_CARDS:
      return { ...state, cards: action.payload.data };
    case GET_CARD_BY_ID:
      return { ...state, card: action.payload.card };
    case CREATE_CARD:
      return { ...state, cards: [...state.cards, action.payload] };
    case UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) =>
          card._id === action.payload ? action.payload : card
        ),
      };
    case UPDATE_REVIEW_CARD:
      return { ...state, card: action.payload.card };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card._id !== action.payload),
      };
    default:
      return state;
  }
};
