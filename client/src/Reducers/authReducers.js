import {authConstants} from "../Constants";


export default (state = null, action) => {
    console.log(action);
    switch (action.type) {
        case authConstants.FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
};