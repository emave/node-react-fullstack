import React, {Suspense, lazy, useEffect, useState} from "react";
import {Route, BrowserRouter} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {customTheme} from "../Config/Theme";
import {connect} from "react-redux";
import {authActions} from "../Actions";
import '../Styles/App.sass';
import {Elements, StripeProvider} from "react-stripe-elements";
import {billingDialog} from "./Dialogs/bilingDialog";

const Header = lazy(() => import('./Header'));
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = lazy(() => import('./Landing'));

const App = (props) => {
  const {fetchUser, auth} = props;

  useEffect(() => {
    console.log(auth);
    fetchUser();
  }, [auth ? auth._id : auth]);

  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.REACT_APP_STRIPE_KEY));
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        setStripe(window.Stripe(process.env.REACT_APP_STRIPE_KEY));
      });
    }
  }, []);

  return (
    <MuiThemeProvider theme={customTheme}>
      <Suspense fallback={
        <div style={{width: '100%', height: '100%', position: 'fixed', top: '0', left: '0'}}>
          <p style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>Loading...</p>
        </div>
      }>
        <BrowserRouter>
          <Header/>
          <Route path={'/surveys/new'} component={SurveyNew}/>
          <Route path={'/surveys'} component={Dashboard} exact/>
          <Route path={'/'} component={Landing} exact/>
        </BrowserRouter>

        <StripeProvider stripe={stripe}>
        <Elements>
          <billingDialog/>
        </Elements>
      </StripeProvider>
      </Suspense>
    </MuiThemeProvider>
  )
};

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(authActions.fetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);