import React from 'react';
import {CardElement, injectStripe} from "react-stripe-elements";
import {Button, Card, CardActions, CardContent, CardHeader, Divider} from "@material-ui/core";
import {connect} from "react-redux";
import {authActions} from '../Actions/authActions';

const Payments = (props) => {

  const submitHandler = (e) => {
    e.preventDefault();

    props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      props.handleToken(token);
    });

  };

  return (
    <Card component={'form'} onSubmit={submitHandler}>
      <CardHeader
        title={'Pay us money'}
      />
      <Divider/>
      <CardContent>
        <CardElement/>
      </CardContent>
      <Divider/>
      <CardActions style={{textAlign: 'center', padding: '10px'}}>
        <Button style={{margin: 'auto'}} type={'submit'}>Submit</Button>
      </CardActions>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleToken: (token) => dispatch(authActions.handleToken(token))
});

export default connect(null, mapDispatchToProps)(injectStripe(Payments));