import { createSlice } from "@reduxjs/toolkit";

export interface contactsInitialStateType {
  contacts: [
    {
      contact_id: string;
      contactname: string;
    }
  ];
}
const initialState: contactsInitialStateType = {
  contacts: [
    {
      contact_id: "",
      contactname: "",
    },
  ],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    resetContacts: (state, action) => {
      state.contacts = [
        {
          contact_id: "",
          contactname: "",
        },
      ];
    },
  },
});

export const { setContacts, resetContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
