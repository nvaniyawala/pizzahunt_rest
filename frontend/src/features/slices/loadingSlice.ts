import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { progress: number } = {
  progress: 0,
};
const topLoadingSlice = createSlice({
  name: "topLoading",
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
  },
});
export const { setProgress } = topLoadingSlice.actions;
export default topLoadingSlice.reducer;
