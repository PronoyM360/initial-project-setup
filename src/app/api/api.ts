import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { errorStatus } from "../utilities/response";
import { clearAuth } from "../slice/authSlice";
import { TagTypes } from "../utilities/tags";
import { baseUrl } from "../utilities/baseQuery";

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

export const api = createApi({
  reducerPath: "root",
  baseQuery: async (args, api, extraOptions) => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;

    const executeWithRetry = async (attempt = 1) => {
      try {
        const response = await baseQuery(args, api, extraOptions);

        if (response.error) {
          if (errorStatus.includes(response.error.status)) {
            api.dispatch(clearAuth());
            return response;
          }
          if (
            attempt < MAX_RETRIES &&
            (response.error.status === "FETCH_ERROR" ||
              (typeof response.error.status === "number" &&
                response.error.status >= 500))
          ) {
            await new Promise((resolve) =>
              setTimeout(resolve, RETRY_DELAY * attempt)
            );
            return executeWithRetry(attempt + 1);
          }
          const errorWithMeta = response.error as FetchBaseQueryError & {
            meta?: unknown;
          };
          errorWithMeta.meta = {
            timestamp: new Date().toISOString(),
            attempt,
            originalArgs: args,
          };
        }
        return response;
      } catch (error) {
        console.error("API Query Error:", {
          error,
          args,
          attempt,
        });

        return {
          error: {
            status: "CUSTOM_ERROR",
            data: {
              message: "An unexpected error occurred",
              originalError: error,
            },
          },
        };
      }
    };
    return executeWithRetry();
  },
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  tagTypes: Object.values(TagTypes),
  endpoints: () => ({}),
});

export type ApiEndpoint = typeof api.endpoints;
export default api;
