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
    addUserApp: (state, action) => {
      const { appData } = action.payload;
      // Check if the company already exists in the userApps array
      const existingCompany = state.userApps.find(
        (app) => app.company_id === appData.company_id
      );
      if (existingCompany) {
        // If the company exists, add the new application to the company's applications array
        existingCompany.applications.push({
          Status: appData.application_status,
          Position: appData.job_title,
          Applied_Date: appData.creation_date,
          Application_ID: appData.applied_id,
          Company_Website: appData.website,
        });
      } else {
        // If the company doesn't exist, create a new company entry with the new application
        state.userApps.push({
          company_id: appData.company_id,
          COMPANYNAME: 'Hardcoded Company Name', // You can adjust this based on your logic
          applications: [appData],
          contacts: [],
          past_job_contacts: [],
        });
      }
    },
    deleteUserApps: (state, action) => {
      const filteredApps = state.userApps.filter((app) => {
        return app.applications[0].Application_ID !== action.payload;
      });
      state.userApps = filteredApps;
    },
    editUserApp: (state, action) => {
      // found will check the id of the applications in the db against the application id from the payload if there is a match
      let found = state.userApps.find(
        (app) =>
          app.applications[0].Application_ID === action.payload.applicationId
      );
      // we create a new variable and extract the action.payload.data.job_title
      let job_title = action.payload.data.job_title;
      let companyName = action.payload.data.companyName;
      if (found) {
        console.log('from redux copnayname', companyName);
        console.log('data from redux', action.payload.data);
        // if found, ie we have a match then reassign the position on the front end
        found.company = companyName;
        found.applications[0].Position = job_title;
      }
    },
  },
});

export const {
  setUserApps,
  resetUserApps,
  deleteUserApps,
  editUserApp,
  addUserApp,
} = userAppsSlice.actions;
export default userAppsSlice.reducer;
