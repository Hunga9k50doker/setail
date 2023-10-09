import * as api from "../api";
import {
  CREATE_TOUR,
  DELETE_TOUR,
  UPDATE_TOUR,
  GET_ALL_TOURS,
  GET_TOUR_BY_ID,
  START_LOADING,
  END_LOADING,
  UPDATE_REVIEW_TOUR,
} from "../constants/actionTypes";
import { toast } from "react-toastify";

export const getTours = (userId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchTours(userId);
    dispatch({ type: END_LOADING });
    dispatch({ type: GET_ALL_TOURS, payload: { data } });
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const getTourById = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.getTourById(id);
    dispatch({ type: GET_TOUR_BY_ID, payload: { tour: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

export const createTour = (tour) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createTour(tour);
    dispatch({ type: END_LOADING });
    dispatch({ type: CREATE_TOUR, payload: data });
    toast.success("Successfully!");
  } catch (error) {
    dispatch({ type: END_LOADING });
    toast.error(error?.response?.data?.message);
  }
};

// export const updateTour = (id, newData, callBack) => async (dispatch) => {
//   dispatch({ type: START_LOADING });
//   try {
//     const { data } = await api.updateTour(id, newData);
//     dispatch({ type: UPDATE_TOUR, payload: data });
//     dispatch({ type: END_LOADING });
//     toast.success("Successfully!");
//     callBack.goBack();
//   } catch (error) {
//     dispatch({ type: END_LOADING });
//     toast.error(error?.response?.data?.message);
//   }
// };

// export const updateReviewTour = (id, newData) => async (dispatch) => {
//   dispatch({ type: START_LOADING });
//   try {
//     const { data } = await api.updateReviewTour(id, newData);
//     dispatch({ type: UPDATE_REVIEW_TOUR, payload: { tour: data } });
//     dispatch({ type: END_LOADING });
//     toast.success("Successfully!");
//   } catch (error) {
//     dispatch({ type: END_LOADING });
//     toast.error(error?.response?.data?.message);
//   }
// };

// export const deleteTour = (id) => async (dispatch) => {
//   dispatch({ type: START_LOADING });
//   try {
//     await api.deleteTour(id);
//     dispatch({ type: DELETE_TOUR, payload: id });
//     dispatch({ type: END_LOADING });
//     toast.success("Successfully!");
//   } catch (error) {
//     dispatch({ type: END_LOADING });
//     toast.error(error?.response?.data?.message);
//   }
// };
