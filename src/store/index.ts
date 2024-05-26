import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './userSlice.ts'
import companiesReducer from './companiesSlice.ts'
import userAppsReducer from './userAppsSlice.ts'


const store = configureStore({
  reducer: {
    users: usersReducer,
    companies: companiesReducer,
    userApps: userAppsReducer
  
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;