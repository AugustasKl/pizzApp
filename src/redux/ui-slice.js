import { createSlice } from "@reduxjs/toolkit";

const uiNotificationsState = {
  status: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiNotificationsState,
  reducers: {
    successNotification(state, action) {
      state.status = action.payload.status;
    },
    pendingNotification(state, action) {
      state.status = action.payload.status;
    },
    errorNotification(state, action) {
      state.status = action.payload.status;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
