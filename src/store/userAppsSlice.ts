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
      console.log('data from add user APP', data);
      console.log('heres the app data', appData);
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
        console.log(
          existingCompany,
          'existing company from redux. Should be proxy and all that shit'
        );
        console.log(existingCompanyCopy, 'COPY from redux');
        console.log(contactsCopy, 'contacts copy from redux');

        existingCompany.applications.push({
          Status: appData.application_status,
          Position: appData.job_title,
          Applied_Date: appData.creation_date,
          Application_ID: appData.applied_id,
          application_info: appData.application_info,
          Company_Website: appData.website,
          company_name: existingCompanyCopy.company,
          company_id: appData.company_id,
          Last_Updated_Date: appData.last_updated,
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
                application_info: appData.application_info,
                Company_Website: appData.website,
                company_name: data.newCompanyName,
                Last_Updated_Date: appData.last_updated,
              },
            ],
            contacts: [],
            past_job_contacts: [],
          },
        ];
      }
    },
    deleteUserApps: (state, action) => {
      const appIdToDelete = action.payload;

      state.userApps = state.userApps
        .map((company) => {
          // Filter out the application from the company's applications array
          const updatedApplications = company.applications.filter(
            (app) => app.Application_ID !== appIdToDelete
          );

          // Return the company with the updated applications if there are still applications left
          if (updatedApplications.length > 0) {
            return { ...company, applications: updatedApplications };
          }

          // If no applications are left, remove the company entirely (filter out in the next step)
          return null;
        })
        .filter(Boolean); // Remove null values (companies with no applications left)
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
      const { appId, data } = action.payload;

      state.userApps = state.userApps.map((company) => {
        // Check if the company has the application
        const updatedApplications = company.applications.map((app) => {
          if (app.Application_ID === appId) {
            // Return the updated application with new data
            return {
              ...app,
              Position: data.job_title, // Example: updating job title
              Status: data.Status, // Example: updating status
              application_info: data.application_info,
              Company_Website: data.Company_Website,
            };
          }
          return app;
        });

        // Return the company with updated applications
        return { ...company, applications: updatedApplications };
      });
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
