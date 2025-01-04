import { RouteObject } from "react-router-dom";
import Dashboard from "../modules/Dashboard/page/Dashboard";
import Settings from "../modules/Settings/pages/Settings";
import TeacherList from "../modules/Teacher/page/TeacherList";

type AppRouteObject = RouteObject & {
  children?: AppRouteObject[];
  //   name?: ModuleNameType;
  //   noGuard?: boolean;
};

export const appRoutes: AppRouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/teachers",
    element: <TeacherList />,
  },

  {
    path: "settings",
    element: <Settings />,
  },
];
