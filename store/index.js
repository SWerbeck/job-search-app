import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userslice';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
