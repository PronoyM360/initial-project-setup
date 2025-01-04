import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type NotificationStateType = {
  type: "success" | "info" | "warning" | "error";
  description?: string;
  placement?:
    | "top"
    | "topLeft"
    | "topRight"
    | "bottom"
    | "bottomLeft"
    | "bottomRight";
};

const initialState: NotificationStateType = {
  type: "success",
  description: undefined,
  placement: "bottomRight",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    openNotification: (
      state,
      { payload }: PayloadAction<Partial<NotificationStateType>>
    ) => {
      return {
        ...state,
        ...payload,
        placement: payload.placement || "bottomRight",
      };
    },
    clearNotification: () => {
      return { ...initialState };
    },
  },
});

export const NotificationState = (state: RootState) => state.notification;

export const { openNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
