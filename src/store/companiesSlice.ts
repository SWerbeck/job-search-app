import { createSlice } from "@reduxjs/toolkit";


export interface companiesInitialStateType {
  companies: [
    {
      company_id: string;
      COMPANYNAME: string;
      WEBSITE: string;
    }
  ];
}
const initialState: companiesInitialStateType = {
    companies: [
        {
          company_id: "",
          COMPANYNAME: "",
          WEBSITE: ""
        }
      ],
};

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    resetCompanies: (state, action) => {
      state.companies = [
        {
          company_id: "",
          COMPANYNAME: "",
          WEBSITE: ""
        }
      ];
    },
  
  },
});


export const { setCompanies, resetCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;