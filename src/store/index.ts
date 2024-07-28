import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './userSlice.ts'
import companiesReducer from './companiesSlice.ts'
import userAppsReducer from './userAppsSlice.ts'
import contactsReducer from './contactsSlice.ts'


const store = configureStore({
  reducer: {
    users: usersReducer,
    companies: companiesReducer,
    userApps: userAppsReducer,
    contacts: contactsReducer
  
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;