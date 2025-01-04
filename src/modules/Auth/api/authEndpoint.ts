import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../app/api/api";
import { ApiResponse, ApiResult } from "../../../app/utilities/response";
import { CREATE_TAGS } from "../../../app/utilities/tags";
import { setAuth } from "../../../app/slice/authSlice";
import { openNotification } from "../../../app/slice/notificationSlice";
import { ForgotPasswordTypes, LoginTypes } from "../types/authTypes";

const authEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<ApiResult>, LoginTypes>({
      query: (data): FetchArgs => ({
        url: "/auth/agent/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data.success) {
          const { success, token } = data;
          dispatch(setAuth({ success, token }));
          dispatch(
            openNotification({
              description: "You have successfully logged in.",
            })
          );
        }
      },
      invalidatesTags: [CREATE_TAGS("PROFILE")],
    }),

    sendOTP: builder.mutation<ApiResponse<ApiResult>, ForgotPasswordTypes>({
      query: (data): FetchArgs => ({
        url: "/common/send-email-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [CREATE_TAGS("PROFILE")],
    }),

    matchOTP: builder.mutation<ApiResponse<ApiResult>, ForgotPasswordTypes>({
      query: (data): FetchArgs => ({
        url: "/common/match-email-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [CREATE_TAGS("PROFILE")],
    }),

    forgotPassword: builder.mutation<
      ApiResponse<ApiResult>,
      ForgotPasswordTypes
    >({
      query: (data): FetchArgs => ({
        url: "/auth/member/forget-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [CREATE_TAGS("PROFILE")],
    }),

    /// END ///
  }),
});

export const {
  useLoginMutation,
  useSendOTPMutation,
  useMatchOTPMutation,
  useForgotPasswordMutation,
} = authEndpoint;
