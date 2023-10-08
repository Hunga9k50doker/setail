/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import {
  CREATE_TOUR,
  GET_ALL_TOURS,
  GET_TOUR_BY_ID,
  END_LOADING,
  START_LOADING,
} from "../constants/actionTypes";
import { produce } from "immer";

const initialState = { isLoading: true, tours: [], tour: null };

const reducer = (state = initialState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case START_LOADING:
        draftState.isLoading = true;
        break;
      case END_LOADING:
        draftState.isLoading = false;
        break;
      case GET_ALL_TOURS:
        draftState.tours = action.payload.data;
        break;
      case GET_TOUR_BY_ID:
        draftState.tour = action.payload.tour;
        break;
      case CREATE_TOUR:
        draftState.tours.push(action.payload);
        break;
      default:
        break;
    }
  });
};

export default reducer;
