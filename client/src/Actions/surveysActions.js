import {surveysConstants} from "../Constants";
import axios from 'axios';

const fetchSurveys = () => async dispatch => {
  dispatch({type: surveysConstants.START_FETCH_SURVEYS});
  try{
    const res = await axios.get('/api/surveys');
    dispatch({type: surveysConstants.SUCCESS_FETCH_SURVEYS, payload: res.data.reverse()})
  }
  catch (e) {
    alert('Error with uploading surveys!');
    dispatch({type: surveysConstants.SUCCESS_FETCH_SURVEYS, payload: []})
  }
};

export const surveysActions = {
  fetchSurveys
};