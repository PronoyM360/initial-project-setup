import { Dispatch, SetStateAction } from "react";

export type ApiResponse<T> = Partial<{
  data: T;
  total: number;
  success: boolean;
  message: string;
  token: string;
}>;

export type ApiResult = Partial<{
  data: unknown;
  success: boolean;
  message: string;
  token: string;
}>;

export type SetStateAnyOrNull = Dispatch<SetStateAction<unknown | null>>;
export type SetStateNullable<T> = Dispatch<SetStateAction<T | null>>;

export const errorStatus: Array<string | number> = [401, 403];
