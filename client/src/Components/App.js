import React, {Suspense, lazy, useEffect, useState} from "react";
import {Route, BrowserRouter} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {customTheme} from "../Config/Theme";
import {connect} from "react-redux";
import {authActions} from "../Actions";
import {BillingDialog} from "./Dialogs";
import '../Styles/App.sass';
import {Elements, StripeProvider} from "react-stripe-elements";

const Header = lazy(() => import('./Header'));
const Dashboard = lazy(() => import('./Dashboard'));
const SurveyNew = lazy(() => import('./Surveys/SurveyNew'));
const Landing = lazy(() => import('./Landing'));

const SuspenseBlock = () => (
  <div style={{width: '100%', height: '100%', position: 'absolute', top: '0', left: '0', zIndex: '100'}}>
    <p style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>Loading...</p>
  </div>
);

const App = (props) => {
  const {fetchUser, auth} = props;

  useEffect(() => {
    fetchUser();
  }, [auth ? auth._id : auth]);

  const [stripeState, setStripe] = useState(null);

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
      <Suspense fallback={SuspenseBlock()}>
        <BrowserRouter>
          <Header/>
          <Suspense fallback={SuspenseBlock()}>
            <div style={{maxWidth: '1200px', margin: 'auto', padding: '80px 0 20px'}}>
              <Route path={'/surveys/new'} component={SurveyNew}/>
              <Route path={'/surveys'} component={Dashboard} exact/>
              <Route path={'/'} component={Landing} exact/>
            </div>
          </Suspense>
        </BrowserRouter>

        <StripeProvider stripe={stripeState}>
          <Elements>
            <BillingDialog/>
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