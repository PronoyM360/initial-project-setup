import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../app/api/api";
import { ApiResponse } from "../../../app/utilities/response";
import { ProfileTypes } from "../types/profileTypes";
import { CREATE_TAGS } from "../../../app/utilities/tags";

const profileEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ApiResponse<ProfileTypes>, void>({
      query: (): FetchArgs => ({
        url: "/btob/profile",
        method: "GET",
      }),
      providesTags: [CREATE_TAGS("PROFILE")],
    }),
  }),
});

export const { useGetProfileQuery } = profileEndpoint;
