import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../app/api/api";
import { ApiResponse, ApiResult } from "../../../app/utilities/response";
import { ChangePasswordTypes, ProfileTypes } from "../types/profileTypes";
import { CREATE_TAGS } from "../../../app/utilities/tags";

const profileEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ApiResponse<ProfileTypes>, void>({
      query: (): FetchArgs => ({
        url: "/admin/profile",
        method: "GET",
      }),
      providesTags: [CREATE_TAGS("PROFILE")],
    }),
    updateProfile: builder.mutation<ApiResponse<ApiResult>, FormData>({
      query: (data): FetchArgs => ({
        url: `/admin/profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [CREATE_TAGS("PROFILE")],
    }),

    changePassword: builder.mutation<
      ApiResponse<ApiResult>,
      ChangePasswordTypes
    >({
      query: (data): FetchArgs => ({
        url: `/admin/profile/change-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [CREATE_TAGS("PROFILE")],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileEndpoint;
