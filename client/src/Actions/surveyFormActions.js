import {authConstants} from "../Constants";
import axios from 'axios';

const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({type: authConstants.FETCH_USER, payload: res.data});
};

export const surveyFormActions = {
  submitSurvey
};