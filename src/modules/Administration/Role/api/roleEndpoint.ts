import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../../app/api/api";
import { CREATE_TAGS } from "../../../../app/utilities/tags";
import { ApiResponse, ApiResult } from "../../../../app/utilities/response";
import {
  ICreateRoleTypes,
  IRoleDetails,
  IUpdateRoleTypes,
} from "../types/roleTypes";

const roleEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create Role
    createRole: builder.mutation<ApiResponse<ApiResult>, ICreateRoleTypes>({
      query: (data): FetchArgs => ({
        url: "/admin/administration/role",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [CREATE_TAGS("ADMINISTRATION")],
    }),

    // Get All Role
    getAllRoles: builder.query<ApiResponse<IRoleDetails[]>, void>({
      query: (): FetchArgs => ({
        url: "/admin/administration/role",
        method: "GET",
      }),
      providesTags: [CREATE_TAGS("ADMINISTRATION")],
    }),

    // Get Single Role
    getRoleById: builder.query<ApiResponse<IRoleDetails>, string>({
      query: (id): FetchArgs => ({
        url: `/admin/administration/role/${id}`,
        method: "GET",
      }),
      providesTags: () => ["ADMINISTRATION"],
    }),

    // Update Role
    updateRole: builder.mutation<ApiResponse<ApiResult>, IUpdateRoleTypes>({
      query: ({ id, ...data }): FetchArgs => ({
        url: `/admin/administration/role/${id}`,
        method: "PATCH",
        body: data,
      }),
      //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //     const { data } = await queryFulfilled;
      //     if (data.success) {
      //       dispatch(
      //         openNotification({
      //           description: "Role has been updated successfully.",
      //         })
      //       );
      //     }
      //   },
      invalidatesTags: [CREATE_TAGS("ADMINISTRATION")],
    }),
    // Delete Batch
    // deleteBatch: builder.mutation<ApiResponse<ApiResult>, string>({
    //   query: (id): FetchArgs => ({
    //     url: `/admin/batch/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [CREATE_TAGS("BATCH")],
    // }),
  }),
});

export const {
  useCreateRoleMutation,
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
} = roleEndpoint;
