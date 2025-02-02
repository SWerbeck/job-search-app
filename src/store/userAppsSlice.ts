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
      const { appData, data } = action.payload;

      // Check if the company already exists
      const existingCompany = state.userApps.find(
        (app) => app.company_id === appData.company_id
      );

      if (existingCompany) {
        console.log('Company already exists, adding new application.');

        // Make copies to avoid Proxy issues due to Immer.js, which is used under the hood by Redux Toolkit.
        // Immer allows you to work with state immutably while using mutable syntax, but
        //      (Proxy(Object), [[Handler]], [[Target]], [[IsRevoked]]) indicates that attempting to access a value in a draft state outside of where Immer manages it.
        const existingCompanyCopy = { ...existingCompany };
        const contactsCopy =
          existingCompanyCopy?.contacts?.map((contact) => ({ ...contact })) ||
          [];
        console.log(existingCompanyCopy, 'COPY from redux');
        existingCompany.applications.push({
          Status: appData.application_status,
          Position: appData.job_title,
          Applied_Date: appData.creation_date,
          Application_ID: appData.applied_id,
          Company_Website: appData.website,
          company_name: existingCompanyCopy.company,
          company_id: appData.company_id,
        });
      } else {
        console.log('Company does not exist, creating new entry.');

        state.userApps = [
          ...state.userApps,
          {
            company_id: appData.company_id,
            company: data.newCompanyName,
            applications: [
              {
                Status: appData.application_status,
                Position: appData.job_title,
                Applied_Date: appData.creation_date,
                Application_ID: appData.applied_id,
                Company_Website: appData.website,
                company_name: data.newCompanyName,
              },
            ],
            contacts: [],
            past_job_contacts: [],
          },
        ];
      }
    },
    deleteUserApps: (state, action) => {
      const filteredApps = state.userApps.filter((app) => {
        return app.applications[0].Application_ID !== action.payload;
      });
      state.userApps = filteredApps;
    },
    editCompanyName: (state, action) => {
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
    editAppInfo: (state, action) => {
      // found will check the id of the applications in the db against the application id from the payload if there is a match
      console.log('state', state);
      console.log('action', action);
      let found = state.userApps.find(
        (app) => app.applications[0].Application_ID === action.payload.appId
      );
      // we create a new variable and extract the action.payload.data.job_title
      let job_title = action.payload.data.job_title;
      //let companyName = action.payload.data.companyName;
      if (found) {
        console.log('data from redux', action.payload.data);
        // if found, ie we have a match then reassign the position on the front end
        //found.company = companyName;
        found.applications[0].Position = job_title;
      }
    },
  },
});

export const {
  setUserApps,
  resetUserApps,
  deleteUserApps,
  editAppInfo,
  editCompanyName,
  addUserApp,
} = userAppsSlice.actions;
export default userAppsSlice.reducer;
