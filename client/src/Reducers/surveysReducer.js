import {surveysConstants} from "../Constants";


export default (state = {loading: false, surveys: []}, action) => {
  switch (action.type) {
    case surveysConstants.START_FETCH_SURVEYS:
      return {
        ...state,
        loading: true
      };
    case surveysConstants.FETCH_SURVEYS:
      return {
        ...state,
        surveys: action.payload
      };
    case surveysConstants.SUCCESS_FETCH_SURVEYS:
      return {
        loading: false,
        surveys: action.payload
      };
    default:
      return state;
  }
};