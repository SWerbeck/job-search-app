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
    // addUserApp: (state, action) => {
    //   console.log('action before?', action);
    //   const newVariable = [...state.userApps];
    //   console.log('newVariable', newVariable);
    //   let found = state.userApps.find(
    //     (app) => app.company_id === action.payload.company_id
    //     // app.applications[0].Application_ID === action.payload.applicationId
    //   );
    //   let indexFound = state.userApps.indexOf(found);
    //   console.log('index found!!!', indexFound);
    //   if (found) {
    //     // console.log('company name???', state.userApps[`${indexFound}`].company);
    //     // return (state.userApps.COMPANYNAME =
    //     //   state.userApps[`${indexFound}`].company);

    //     let newAppObj = {
    //       Position: action.payload.position,
    //     };
    //     //return [...state.userApps[`${indexFound}`][applications], newAppObj];
    //   }
    //   //state.userApps.push(action.payload);
    //   console.log('action AFTER?', state.userApps);
    // },
    addUserApp: (state, action) => {
      console.log('action before?', action);

      state.userApps.push(action.payload); // Create a new array with the new application
      console.log('action AFTER?', action);
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
