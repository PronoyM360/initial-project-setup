import { RouteObject } from "react-router-dom";
import Dashboard from "../modules/Dashboard/page/Dashboard";
import Settings from "../modules/Settings/pages/Settings";
import TeacherList from "../modules/Teacher/page/TeacherList";
import PermissionGuard from "./PermissionGuard";
import AdminList from "../modules/Administration/Admin/pages/AdminList";
import RoleList from "../modules/Administration/Role/pages/RoleList";
import PermissionList from "../modules/Administration/Permission/pages/PermissionList";

type AppRouteObject = RouteObject & {
  children?: AppRouteObject[];
};

export const appRoutes: AppRouteObject[] = [
  {
    path: "/",
    element: <PermissionGuard name="Dashboard" children={<Dashboard />} />,
  },
  // Teacher Routes
  {
    path: "/teacher",
    element: <PermissionGuard name="Teacher" children={<TeacherList />} />,
  },
  // Administration Routes
  {
    path: "/administration",
    children: [
      {
        path: "admin",
        element: (
          <PermissionGuard name="Administration" children={<AdminList />} />
        ),
      },
      {
        path: "role",
        element: (
          <PermissionGuard name="Administration" children={<RoleList />} />
        ),
      },
      {
        path: "permission",
        element: (
          <PermissionGuard
            name="Administration"
            children={<PermissionList />}
          />
        ),
      },
    ],
  },
  {
    path: "profile",
    element: <Settings />,
  },
];
