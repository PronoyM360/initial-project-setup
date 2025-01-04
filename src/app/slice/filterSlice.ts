import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type FilterStateType<T = unknown> = {
  limit: number;
  skip: number;
  key?: string;
} & {
  [key: string]: T;
};

const initialState: FilterStateType = {
  limit: 50,
  skip: 0,
  key: undefined,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (
      state,
      {
        payload,
      }: PayloadAction<{
        name: 'LIMIT' | 'SKIP' | 'KEY';
        value: number | string | undefined;
      }>
    ) => {
      switch (payload.name) {
        case 'LIMIT':
          state.limit = payload.value as number;
          break;
        case 'SKIP':
          state.skip = payload.value as number;
          break;
        case 'KEY':
          state.key = payload.value as string;
          break;
        default:
          break;
      }
    },

    addRestFilter: (
      state,
      {
        payload,
      }: PayloadAction<{
        label: string;
        value: string | number | boolean | undefined;
      }>
    ) => {
      state[payload.label] = payload.value;
    },

    resetFilter: (state) => {
      state.limit = 50;
      state.skip = 0;
      state.key = undefined;
      Object.keys(state).forEach((key) => {
        if (!['limit', 'skip', 'key'].includes(key)) {
          delete state[key];
        }
      });
    },
  },
});

export const FilterState = (state: RootState) => state.filter;

export const { addFilter, addRestFilter, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;
