import React from "react";
import ReactDom from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import reduxThunk from 'redux-thunk';

import App from "./Components/App";
import reducers from './Reducers';

import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));