import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  token: null,
};
const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    token: (state, action) => {
      state.modalState = action.payload;
    },
  },
});
export const { token } = LoginSlice.actions;
export default LoginSlice.reducer;
