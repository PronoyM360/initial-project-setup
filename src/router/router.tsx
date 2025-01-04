import { createBrowserRouter } from "react-router-dom";
import NotFound from "../common/Utilities/NotFound";
import MainLayout from "../layout/page/MainLayout";
import ForgotPassword from "../modules/Auth/components/ForgotPassword";
import MatchOTP from "../modules/Auth/components/MatchOTP";
import SendOTP from "../modules/Auth/components/SendOTP";
import Auth from "../modules/Auth/pages/Auth";
import Login from "../modules/Auth/pages/Login";
import PrivateRouter from "./PrivateRouter";
import { appRoutes } from "./AppRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <MainLayout />
      </PrivateRouter>
    ),
    errorElement: <NotFound />,
    children: appRoutes.map(({ path, element, children }) => {
      return {
        path: path,
        element: element,
        children: children
          ? children.map((child) => ({
              ...child,
              element: child.element,
            }))
          : children,
      };
    }),
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "send-otp",
        element: <SendOTP />,
      },
      {
        path: "match-otp",
        element: <MatchOTP />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default router;
