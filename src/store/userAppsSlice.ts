import { createSlice } from "@reduxjs/toolkit";


export interface userAppsInitialStateType {
  userApps: [
    {
      company_id: string;
      COMPANYNAME: string;
      applications: [];
      contacts: [];
      past_job_contacts: [];
    }
  ];
}
const initialState: userAppsInitialStateType = {
    userApps: [
        {
      company_id: "",
      COMPANYNAME: "",
      applications: [],
      contacts: [],
      past_job_contacts: []
        }
      ],
};

export const userAppsSlice = createSlice({
  name: "userApps",
  initialState,
  reducers: {
    setUserApps: (state, action) => {
      state.userApps = action.payload;
    },
    resetUserApps: (state, action) => {
      state.userApps = [
        {
            company_id: "",
            COMPANYNAME: "",
            applications: [],
            contacts: [],
            past_job_contacts: []
        }
      ];
    },
  
  },
});


export const { setUserApps, resetUserApps } = userAppsSlice.actions;
export default userAppsSlice.reducer;