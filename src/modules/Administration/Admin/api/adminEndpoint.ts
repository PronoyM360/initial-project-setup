import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../../app/api/api";
import { CREATE_TAGS } from "../../../../app/utilities/tags";
import { ApiResponse, ApiResult } from "../../../../app/utilities/response";
import {
  IAdminDetailsTypes,
  IAdminListTypes,
  ICreateAdminTypes,
  IUpdateAdminTypes,
} from "../types/adminTypes";
import { IFilterDataTypes } from "../../../../common/Types/CommonTypes";

const adminEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create Admin
    createAdmin: builder.mutation<ApiResponse<ApiResult>, ICreateAdminTypes>({
      query: (data): FetchArgs => ({
        url: "/admin/administration/admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [CREATE_TAGS("ADMINISTRATION")],
    }),

    // Get All Admin
    getAllAdmin: builder.query<ApiResponse<IAdminListTypes[]>, IFilterDataTypes>({
      query: (params): FetchArgs => ({
        url: "/admin/administration/admin",
        method: "GET",
        params
      }),
      providesTags: [CREATE_TAGS("ADMINISTRATION")],
    }),

    // Get Single Admin
    getAdminById: builder.query<ApiResponse<IAdminDetailsTypes>, string>({
      query: (id): FetchArgs => ({
        url: `/admin/administration/admin/${id}`,
        method: "GET",
      }),
      providesTags: () => ["ADMINISTRATION"],
    }),

    // Update Admin
    updateAdmin: builder.mutation<ApiResponse<ApiResult>, IUpdateAdminTypes>({
      query: ({ id, data }): FetchArgs => ({
        url: `/admin/administration/admin/${id}`,
        method: "PATCH",
        body: data,
      }),
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   const { data } = await queryFulfilled;
      //   if (data.success) {
      //     dispatch(
      //       openNotification({
      //         description: "Course has been updated successfully.",
      //       })
      //     );
      //   }
      // },
      invalidatesTags: [CREATE_TAGS("ADMINISTRATION")],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAllAdminQuery,
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
} = adminEndpoint;
