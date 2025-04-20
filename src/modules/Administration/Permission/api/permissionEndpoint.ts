import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../../app/api/api";
import { ApiResponse, ApiResult } from "../../../../app/utilities/response";
import {
  ICreatePermissionTypes,
  IPermissionListTypes,
} from "../types/permissionTypes";
import { CREATE_TAGS } from "../../../../app/utilities/tags";

const permissionEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create Permission
    createPermission: builder.mutation<
      ApiResponse<ApiResult>,
      ICreatePermissionTypes
    >({
      query: (data): FetchArgs => ({
        url: "/admin/administration/permission",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [CREATE_TAGS("ADMINISTRATION")],
    }),

    // Get All Permissions
    getAllPermissions: builder.query<ApiResponse<IPermissionListTypes[]>, void>(
      {
        query: (): FetchArgs => ({
          url: "/admin/administration/permission",
          method: "GET",
        }),
        providesTags: [CREATE_TAGS("ADMINISTRATION")],
      }
    ),
  }),
});

export const { useCreatePermissionMutation, useGetAllPermissionsQuery } =
  permissionEndpoint;
