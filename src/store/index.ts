import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './userSlice.ts'
import companiesReducer from './companiesSlice.ts'


const store = configureStore({
  reducer: {
    users: usersReducer,
    companies: companiesReducer
  
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;