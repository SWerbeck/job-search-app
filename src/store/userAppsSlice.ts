import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userAppsInitialStateType {
  userApps: {
    company_id: string;
    COMPANYNAME: string;
    COMPANY_WEBSITE: string;
    applications: Application[];
    contacts: Contact[];
    past_job_contacts: [];
  }[];
}

const initialState: userAppsInitialStateType = {
  userApps: [
    {
      company_id: "",
      COMPANYNAME: "",
      COMPANY_WEBSITE: "",
      applications: [],
      contacts: [],
      past_job_contacts: [],
    },
  ],
};

interface Contact {
  company_id: string;
  companyname: string;
  contact_email: string | null;
  contact_linkedin: string | null;
  contact_phone: string | null;
  contactname: string;
  creation_date: string;
  followup: boolean;
  followup_reminder: string | null;
  isprimary: boolean;
  last_contacted: string;
  last_updated: string;
  past_jobs: [] | null;
  reply_status: string;
  user_id: string;
}

interface Application {
  Application_ID: string;
  Applied_Date: string;
  COMPANY_WEBSITE: string | null;
  Last_Updated_Date: string;
  Listing_WEBSITE: string;
  Position: string;
  Status: string;
  application_info: string | null;
  company_id: string;
  COMPANYNAME: string;
}

export const userAppsSlice = createSlice({
  name: "userApps",
  initialState,
  reducers: {
    // setUserApps: (state, action) => {
    //   state.userApps = action.payload;
    // },
    // setUserApps: (state, action) => {
    //   state.userApps = action.payload.map((app) => ({
    //     ...app,
    //     COMPANYNAME: app.COMPANYNAME || app.company || "Unknown Company",
    //   }));
    // },
    setUserApps: (
      state,
      action: { payload: userAppsInitialStateType["userApps"] }
    ) => {
      state.userApps = action.payload.map((app) => ({
        ...app,
        COMPANYNAME: app.COMPANYNAME || "Unknown Company",
      }));
    },
    resetUserApps: (state) => {
      state.userApps = [
        {
          company_id: "",
          COMPANYNAME: "",
          COMPANY_WEBSITE: "",
          applications: [],
          contacts: [],
          past_job_contacts: [],
        },
      ];
    },
    addUserApp: (state, action) => {
      const { appData, data } = action.payload;

      // pull the name we passed in from onSubmit
      const companyName = data.companyNameForPayload;

      // check if the company already exists
      const existingCompany = state.userApps.find(
        (app) => app.company_id === appData.company_id
      );

      if (existingCompany) {
        console.log("Company already exists, adding new application.");
        // ✅ update the company name if it was empty before
        if (!existingCompany.COMPANYNAME && companyName) {
          existingCompany.COMPANYNAME = companyName;
        }

        existingCompany.applications.push({
          Status: appData.application_status,
          Position: appData.job_title,
          Applied_Date: appData.creation_date,
          Application_ID: appData.applied_id,
          application_info: appData.application_info,
          Listing_WEBSITE: appData.listing_website,
          COMPANYNAME: existingCompany.COMPANYNAME,
          COMPANY_WEBSITE: existingCompany.COMPANY_WEBSITE,
          company_id: appData.company_id,
          Last_Updated_Date: appData.last_updated,
        });
      } else {
        console.log("Adding new company with application.");
        state.userApps.push({
          company_id: appData.company_id,
          COMPANYNAME: companyName || "Unknown Company", // ✅ always set name here
          COMPANY_WEBSITE: appData.COMPANY_WEBSITE || "",
          contacts: [],
          past_job_contacts: [],
          applications: [
            {
              Status: appData.application_status,
              Position: appData.job_title,
              Applied_Date: appData.creation_date,
              Application_ID: appData.applied_id,
              application_info: appData.application_info,
              Listing_WEBSITE: appData.listing_website,
              COMPANYNAME: companyName || "Unknown Company",
              COMPANY_WEBSITE: appData.COMPANY_WEBSITE || "",
              company_id: appData.company_id,
              Last_Updated_Date: appData.last_updated,
            },
          ],
        });
      }
    },
    deleteUserApps: (state, action: PayloadAction<string>) => {
      const appIdToDelete = action.payload;

      // Keep only companies that have applications after removing the one
      state.userApps = state.userApps
        .map((company) => {
          const remainingApps = company.applications.filter(
            (app) => app.Application_ID !== appIdToDelete
          );

          // Return updated company if it still has applications
          if (remainingApps.length > 0) {
            return { ...company, applications: remainingApps };
          }

          // Otherwise, remove this company
          return null;
        })
        // Filter out the nulls (companies with no applications)
        .filter(
          (company): company is (typeof state.userApps)[number] =>
            company !== null
        );
    },

    editCompanyName: (state, action) => {
      const { applicationId, data } = action.payload;
      const job_title = data.job_title;
      const companyName = data.companyName;

      const found = state.userApps.find((app) =>
        app.applications.some(
          (application) => application.Application_ID === applicationId
        )
      );

      if (found) {
        // Update the top-level company name
        found.COMPANYNAME = companyName;

        // Update the application that matches the applicationId
        found.applications = found.applications.map((app) =>
          app.Application_ID === applicationId
            ? { ...app, Position: job_title, COMPANYNAME: companyName }
            : app
        );
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
              Listing_WEBSITE: data.Listing_WEBSITE,
              company_name: data.Company_name,
              COMPANY_WEBSITE: data.COMPANY_WEBSITE,
            };
          }
          return app;
        });
        const containsApp = company.applications.some(
          (app) => app.Application_ID === appId
        );
        if (containsApp) {
          return {
            ...company,
            company: data.Company_name, // <-- this updates the top-level company field
            applications: updatedApplications,
          };
        }
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
