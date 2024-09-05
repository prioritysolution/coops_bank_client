import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  memberTypeData: [],
};
const ShareProductSlice = createSlice({
  name: "shareProduct",
  initialState,
  reducers: {
    getMemberTypeData: (state, action) => {
      state.memberTypeData = action.payload;
    },
  },
});
export const { getMemberTypeData } = ShareProductSlice.actions;
export default ShareProductSlice.reducer;
