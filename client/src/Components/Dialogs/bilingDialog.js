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

const Payments = (props) => {

  const submitHandler = (e) => {
    e.preventDefault();

    props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      props.handleToken(token);
    });

  };

  return (
    <Dialog open={false} component={'form'} onSubmit={submitHandler}>
      <DialogTitle
        title={'Pay us money'}
      />
      <Divider/>
      <DialogContent>
        <CardElement/>
      </DialogContent>
      <Divider/>
      <DialogActions style={{textAlign: 'center', padding: '10px'}}>
        <Button style={{margin: 'auto'}} type={'submit'}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleToken: (token) => dispatch(authActions.handleToken(token))
});

const connectedComponent = connect(null, mapDispatchToProps)(injectStripe(Payments));

export { connectedComponent as billingDialog };