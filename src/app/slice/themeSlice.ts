import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { themePresets } from "../utilities/theme";

export type ThemeStateType = {
  mode: "dark" | "light";
  fontFamily?: string;
  fontSize?: number;
  colorPrimary?: string;
  sidebarColor?: string;

  name: string;
  siderBg?: string;
  headerBg: string;
  itemBg?: string;
  colorText?: string;
  subMenuItemBg?: string;
  itemHoverBg?: string;
  itemSelectedColor?: string;
  defaultTheme?: string;

  // BUTTON COLOR
  viewBtn?: string;
  editBtn?: string;
  deleteBtn?: string;
};

const initialState: ThemeStateType = {
  ...themePresets[0],
  mode: "light",
  fontFamily: "Roboto, sans-serif",
  fontSize: 14,

  viewBtn: "#38CB89",
  editBtn: "#FFAB00",
  deleteBtn: "#EF4B4B",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, { payload }: PayloadAction<ThemeStateType>) => {
      return { ...state, ...payload };
    },

    themeCustomize: (
      state,
      {
        payload,
      }: PayloadAction<{
        type: "PRIMARY_COLOR" | "FONT_SIZE" | "FONT_FAMILY";
        value: string | number;
      }>
    ) => {
      switch (payload.type) {
        case "PRIMARY_COLOR":
          if (typeof payload.value === "string") {
            state.colorPrimary = payload.value;
          }
          break;

        case "FONT_SIZE":
          if (typeof payload.value === "number") {
            state.fontSize = payload.value;
          }
          break;

        case "FONT_FAMILY":
          if (typeof payload.value === "string") {
            state.fontFamily = payload.value;
          }
          break;

        default:
          return state;
      }
    },
    SideBarCustomize: (
      state,
      {
        payload,
      }: PayloadAction<{
        type: "SIDEBAR_COLOR";
        value: string | number;
      }>
    ) => {
      switch (payload.type) {
        case "SIDEBAR_COLOR":
          if (typeof payload.value === "string") {
            state.sidebarColor = payload.value;
            state.siderBg = payload.value;
            state.itemBg = payload.value;
          }
          break;

        default:
          return state;
      }
    },
  },
});

export const ThemeState = (state: RootState) => state.theme;

export const { toggleTheme, themeCustomize, SideBarCustomize } =
  themeSlice.actions;

export default themeSlice.reducer;
