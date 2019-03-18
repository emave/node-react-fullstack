import React, {Suspense, lazy, useEffect} from "react";
import {Route, BrowserRouter} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {customTheme} from "../Config/Theme";
import {connect} from "react-redux";
import {authActions} from "../Actions";
import '../Styles/App.sass';

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
      </Suspense>
    </MuiThemeProvider>
  )
};

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(authActions.fetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);