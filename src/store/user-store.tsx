import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';


export interface User {
    uid: string;
    email: string;
    emailVerified: boolean;
    idToken: string;
    lastSignInTime?: string;
    creationTime?: string;
}

interface UsersState {
    user: User | null;
    errors: string[];
    isLoggingIn: boolean;
    isLoggingOut: boolean;
}

const INITIAL_STATE: UsersState = {
    user: null,
    isLoggingIn: false,
    isLoggingOut: false,
    errors: [],
};

const loginStartReducer: CaseReducer<UsersState, PayloadAction> = (state) => {
    return Object.assign(state, {
        errors: [],
        isLoggingIn: true,
    });
};

const loginSuccessReducer: CaseReducer<UsersState, PayloadAction<User>> = (state, action) => {
    const user = action.payload;
    return Object.assign(state, {
        errors: [],
        isLoggingIn: false,
        user,
    });
};

const loginFailureReducer: CaseReducer<UsersState, PayloadAction<Error>> = (state, action) => {
    const error = action.payload;
    return Object.assign(state, {
        errors: [...state.errors, error],
        isLoggingIn: false,
        user: null,
    });
};

const logoutStartReducer: CaseReducer<UsersState, PayloadAction> = (state) => {
    return Object.assign(state, {
        errors: [],
        isLoggingOut: true,
    });
};

const logoutSuccessReducer: CaseReducer<UsersState, PayloadAction> = (state) => {
    return Object.assign(state, {
        errors: [],
        isLoggingOut: false,
        user: null,
    });
};

const logoutFailureReducer: CaseReducer<UsersState, PayloadAction<Error>> = (state, action) => {
    const error = action.payload;
    return Object.assign(state, {
        errors: [...state.errors, error],
        user: null,
        isLoggingOut: false,
    });
};

const usersStore = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        loginStart: loginStartReducer,
        loginSuccess: loginSuccessReducer,
        loginFailure: loginFailureReducer,
        logoutStart: logoutStartReducer,
        logoutSuccess: logoutSuccessReducer,
        logoutFailure: logoutFailureReducer,
    },
});

export default usersStore;
export const userActions = usersStore.actions;
