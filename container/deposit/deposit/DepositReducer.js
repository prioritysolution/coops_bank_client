import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  searchAccountData: [],
};
const DepositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    getSearchAccountData: (state, action) => {
      state.searchAccountData = action.payload;
    },
  },
});
export const { getSearchAccountData } = DepositSlice.actions;
export default DepositSlice.reducer;
