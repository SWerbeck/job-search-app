import { createSlice } from "@reduxjs/toolkit";


export interface usersInitialStateType {
  users: [
    {
      user_id: string;
      first_name: string;
      last_name: string;
      USER_PASSWORD: string;
      User_email: string;
      username: string;
    }
  ];
}
const initialState: usersInitialStateType = {
  users: [
{
  user_id: "",
  first_name: "",
  last_name: "",
  USER_PASSWORD: "",
  User_email:  "",
  username:  "",
}   
  ],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    resetUsers: (state, action) => {
      state.users = [
        {
          user_id: "",
          first_name: "",
          last_name: "",
          USER_PASSWORD: "",
          User_email:  "",
          username:  "",
        }   
          ];
    },
  
  },
});


export const { setUsers, resetUsers } = userSlice.actions;
export default userSlice.reducer;