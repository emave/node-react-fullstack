import React from 'react';
import {CardElement, injectStripe} from "react-stripe-elements";
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  Divider
} from "@material-ui/core";
import {connect} from "react-redux";
import {authActions} from '../../Actions/authActions';
import {modalActions} from "../../Actions/modalActions";

const Payments = (props) => {
  const {modals: {billingDialog}, handleToken, stripe, closeModal} = props;

  const submitHandler = (e) => {
    e.preventDefault();
    stripe.createToken({name: 'test name'}).then(({token}) => {
      handleToken(token);
    });
  };

  return <Dialog
    open={billingDialog || false}
    maxWidth={'sm'}
    onClose={billingDialog ? closeModal : null}
    fullWidth={true}
  >
    <form onSubmit={submitHandler}>
      <DialogTitle>
        Pay us money - $5 (any test data)
      </DialogTitle>
      <Divider style={{marginBottom: '25px'}}/>
      <DialogContent>
        <CardElement/>
      </DialogContent>
      <Divider/>
      <DialogActions style={{textAlign: 'center', padding: '10px'}}>
        <Button style={{margin: 'auto'}} type={'submit'}>Submit</Button>
      </DialogActions>
    </form>
  </Dialog>
};

const mapStateToProps = ({modals}) => ({modals});

const mapDispatchToProps = (dispatch) => ({
  handleToken: (token) => dispatch(authActions.handleToken(token)),
  closeModal: () => dispatch(modalActions.closeModal())
});

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(injectStripe(Payments));

export {connectedComponent as BillingDialog};