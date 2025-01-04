import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AuthStateType = {
  success: boolean;
  token: string | undefined;
  message?: string;
};

const initialState: AuthStateType = {
  success: false,
  token: undefined,
  message: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }: PayloadAction<AuthStateType>) => {
      state.success = payload.success;
      state.token = payload.token;
    },
    clearAuth: (state) => {
      state.success = false;
      state.token = undefined;
      state.message = undefined;
    },
    setMessage: (state, { payload }: PayloadAction<string>) => {
      state.message = payload;
    },
    clearMessage: (state) => {
      state.message = undefined;
    },
  },
});

export const AuthState = (state: RootState) => state.auth;

export const { setAuth, clearAuth, setMessage, clearMessage } =
  authSlice.actions;
export default authSlice.reducer;
