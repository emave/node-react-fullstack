import { combineReducers } from "redux";
import authReducer from './authReducers';
import modalReducers from './modalReducers';
import surveysReducers from './surveysReducer';
import { reducer as reduxForm} from 'redux-form';

export default combineReducers({
    auth: authReducer,
    modals: modalReducers,
    surveys: surveysReducers,
    form: reduxForm
})