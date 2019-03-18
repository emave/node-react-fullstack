import axios from 'axios';
import {authConstants} from "../Constants";

const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({type: authConstants.FETCH_USER, payload: res.data});
};

const logoutUser = () => async dispatch => {
  await axios.get('/api/logout');
  dispatch({type: authConstants.FETCH_USER, payload: false});
};

export const handleToken = (token) => async dispatch => {
  console.log(token);
  const res = await axios.post('/api/stripe', token);
  dispatch({type: authConstants.FETCH_USER, payload: res.data});
};

export const authActions = {
  fetchUser,
  logoutUser,
  handleToken
};