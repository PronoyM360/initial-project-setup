import { FetchArgs } from "@reduxjs/toolkit/query";
import api from "../../../app/api/api";
import { ApiResponse } from "../../../app/utilities/response";
import { CREATE_TAGS } from "../../../app/utilities/tags";
import { IDashboardData } from "../types/dashboardTypes";

const dashboardEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All dashboard data
    getAllDashboardData: builder.query<ApiResponse<IDashboardData>, void>({
      query: (): FetchArgs => ({
        url: "/admin/profile/dashboard",
        method: "GET",
      }),
      providesTags: [CREATE_TAGS("DASHBOARD")],
    }),
  }),
});

export const { useGetAllDashboardDataQuery } = dashboardEndpoint;
