import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

import App from './components/App';
import * as serviceWorker from './serviceWorker';
import userService from './services/user-service';
import store from './store/store';

import './index.scss';


const firebaseConfig = {
    apiKey: 'ABC123',
    authDomain: 'PROJECT-ID.firebaseapp.com',
    databaseURL: 'https://PROJECT-ID.firebaseio.com',
    projectId: 'PROJECT-ID',
    storageBucket: 'PROJECT-ID.appspot.com',
    messagingSenderId: '1234567890',
    appId: '1:123456789:web:1234567890',
    measurementId: 'G-ABC123',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();


userService.bindOnAuthStateChangedToStore(store);


ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
