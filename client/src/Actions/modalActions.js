import {modalConstants} from "../Constants";

const openModal = modalName => dispatch => {
  dispatch({type: modalConstants.OPEN_MODAL, payload: { [modalName]: true }});
};

const closeModal = () => dispatch => {
  dispatch({type: modalConstants.CLOSE_MODAL, payload: false});
};

export const modalActions = {
  openModal,
  closeModal
};