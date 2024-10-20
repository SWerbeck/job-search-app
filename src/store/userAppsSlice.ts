import { createSlice } from '@reduxjs/toolkit';

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
      company_id: '',
      COMPANYNAME: '',
      applications: [],
      contacts: [],
      past_job_contacts: [],
    },
  ],
};

export const userAppsSlice = createSlice({
  name: 'userApps',
  initialState,
  reducers: {
    setUserApps: (state, action) => {
      state.userApps = action.payload;
    },
    resetUserApps: (state, action) => {
      state.userApps = [
        {
          company_id: '',
          COMPANYNAME: '',
          applications: [],
          contacts: [],
          past_job_contacts: [],
        },
      ];
    },
    deleteUserApps: (state, action) => {
      const filteredApps = state.userApps.filter((app) => {
        return app.applications[0].Application_ID !== action.payload;
      });
      state.userApps = filteredApps;
    },
    editUserApp: (state, action) => {
      console.log('state from editUserredux',state)
      console.log('action from editUserredux',action)
      console.log('payload from editUserredux',action.payload)

      // const editApp = state.userApps.map((app)=> app.applications[0].Application_ID === action.payload)
      const editApp = state.userApps.map((app)=> {
        if (app.applications[0].Application_ID === action.payload.applicationId) {
          console.log('got the map')
          state.userApps.applications[0].Position = action.payload.data.job_title
        } else {
          console.log('dont got the map')
        }
      })
      state.userApps = editApp
    }

  },
});

export const { setUserApps, resetUserApps, deleteUserApps, editUserApp } =
  userAppsSlice.actions;
export default userAppsSlice.reducer;
