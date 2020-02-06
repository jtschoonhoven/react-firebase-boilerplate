import { configureStore, combineReducers } from '@reduxjs/toolkit';

import usersStore from './user-store';

const reducer = combineReducers({
    users: usersStore.reducer,
});

const store = configureStore({ reducer });

export default store;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof reducer>
