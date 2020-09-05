import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './login/login';
import SignUpComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';

const firebase = require('firebase');
require('firebase/firestore');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD7APw7hKf94VHC6dZiivUI_U4f3Ir1HpU",
  authDomain: "chat-box-9bc2b.firebaseapp.com",
  databaseURL: "https://chat-box-9bc2b.firebaseio.com",
  projectId: "chat-box-9bc2b",  
  storageBucket: "chat-box-9bc2b.appspot.com",
  messagingSenderId: "711719232957",
  appId: "1:711719232957:web:56be3379205c40bc061ed4",
  measurementId: "G-W179L3E9WP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const routing = (
  <Router>
    <div id="routing-container">
      <Route exact path="/login" component={LoginComponent}></Route>
      <Route exact path="/signup" component={SignUpComponent}></Route>
      <Route exact path="/dashboard" component={DashboardComponent}></Route>
    </div>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
