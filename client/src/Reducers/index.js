import { combineReducers } from "redux";
import authReducer from './authReducers';
import modalReducers from './modalReducers';

export default combineReducers({
    auth: authReducer,
    modals: modalReducers
})