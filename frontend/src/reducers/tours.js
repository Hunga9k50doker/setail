/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { CREATE_TOUR, GET_ALL_TOURS, GET_TOUR_BY_ID, END_LOADING, START_LOADING } from "../constants/actionTypes";

export default (state = { isLoading: true, tours: [], tour: null }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case GET_ALL_TOURS:
      return { ...state, tours: action.payload.data };
    case GET_TOUR_BY_ID:
      return { ...state, tour: action.payload.tour };
    case CREATE_TOUR:
      return { ...state, tours: [...state.tours, action.payload] };
    // case UPDATE_CARD:
    //   return { ...state, tours: state.tours.filter((tour) => (tour._id === action.payload ? action.payload : tour)) };
    // case UPDATE_REVIEW_CARD:
    //   return { ...state, tour: action.payload.tour };
    // case DELETE_CARD:
    //   return { ...state, tours: state.tours.filter((tour) => tour._id !== action.payload) };
    default:
      return state;
  }
};
