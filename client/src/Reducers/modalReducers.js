import {modalConstants} from "../Constants";


export default (state = false, action) => {
  switch (action.type) {
    case modalConstants.OPEN_MODAL:
      return action.payload;
    case modalConstants.CLOSE_MODAL:
      return false;
    default:
      return state;
  }
};