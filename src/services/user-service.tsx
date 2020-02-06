import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AppDispatch, AppStore } from '../store/store';
import { userActions, User } from '../store/user-store';


export interface UserCredentials {
    email: string;
    password: string;
}


/**
 * Parse a firebase.User object and return a populated (local) User.
 */
async function _parseFirebaseUser(email: string, firebaseUser: firebase.User): Promise<User> {
    const idToken = await firebaseUser.getIdToken();

    // Construct and return User object.
    const { uid, emailVerified } = firebaseUser;
    const { lastSignInTime, creationTime } = firebaseUser.metadata;
    const user = {
        email,
        uid,
        emailVerified,
        lastSignInTime,
        creationTime,
        idToken,
    };
    return user;
}


function bindOnAuthStateChangedToStore(store: AppStore): void {
    firebase.auth().onAuthStateChanged((firebaseUser: firebase.User | null): void => {
        const { dispatch } = store;
        const isLoggedIn = !!store.getState().users.user;
        if (firebaseUser && firebaseUser.email) {
            if (!isLoggedIn) {
                dispatch(userActions.loginStart());
                _parseFirebaseUser(firebaseUser.email, firebaseUser)
                    .then((user) => { dispatch(userActions.loginSuccess(user)); })
                    .catch((err) => { dispatch(userActions.loginFailure(err)); });
            }
        }
        else if (isLoggedIn) {
            dispatch(userActions.logoutSuccess());
        }
    });
}


/**
 * Login a Firebase user and update state. Throws error on any failure.
 */
async function login(dispatch: AppDispatch, { email, password }: UserCredentials): Promise<User> {
    dispatch(userActions.loginStart());
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);

    // Handle network failure.
    if (!response) {
        const err = new Error('Unexpected error: signInWithEmailAndPassword returned null response');
        dispatch(userActions.loginFailure(err));
        throw err;
    }

    const firebaseUser = response.user;

    // Handle auth failure.
    if (!firebaseUser) {
        const err = new Error('Login failed.');
        dispatch(userActions.loginFailure(err));
        throw err;
    }

    let user;
    try {
        user = await _parseFirebaseUser(email, firebaseUser);
        dispatch(userActions.loginSuccess(user));
    }
    catch (err) {
        dispatch(userActions.loginFailure(err));
        throw err;
    }
    return user;
}


/**
 * Logout the current user and update state.
 */
async function logout(dispatch: AppDispatch): Promise<void> {
    dispatch(userActions.logoutStart());
    try {
        await firebase.auth().signOut();
    }
    catch (err) {
        dispatch(userActions.logoutFailure(err));
        throw err;
    }
    dispatch(userActions.logoutSuccess());
}

export default {
    login,
    logout,
    bindOnAuthStateChangedToStore,
};
