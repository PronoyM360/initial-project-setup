import { isFulfilled, isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { openNotification } from "../slice/notificationSlice";
import { closeModal } from "../slice/modalSlice";
import { closeDrawer } from "../slice/drawerSlice";

type EndpointAction = {
  meta: {
    arg: {
      endpointName: string;
    };
  };
  payload: {
    message?: string;
    data?: {
      message: string;
    };
  };
};

const CONFIG = {
  IGNORED_ENDPOINTS: Object.freeze([
    "login",
    "sendOTP",
    "matchOTP",
    "forgotPassword",
  ]),
  MESSAGES: {
    SUCCESS: "Successfully",
    ERROR: "Something went wrong!",
    DURATION: 3,
  },
} as const;

const getEndpointName = (action: EndpointAction): string =>
  action.meta?.arg?.endpointName || "";

const shouldIgnoreEndpoint = (endpointName: string): boolean =>
  CONFIG.IGNORED_ENDPOINTS.includes(endpointName);

// SUCCESS MIDDLEWARE
export const successMiddleware: Middleware = (api) => (next) => (action) => {
  try {
    if (isFulfilled(action)) {
      const typedAction = action as EndpointAction;
      const endpointName = getEndpointName(typedAction);
      const message = typedAction.payload?.message;

      const shouldShowMessage =
        action.type.includes("executeMutation") &&
        endpointName &&
        !shouldIgnoreEndpoint(endpointName);

      if (shouldShowMessage) {
        api.dispatch(
          openNotification({
            description: message || CONFIG.MESSAGES.SUCCESS,
          })
        );
        api.dispatch(closeModal());
        api.dispatch(closeDrawer());
      }
    }
    return next(action);
  } catch (error) {
    console.error("Success Middleware Error:", error);
    return next(action);
  }
};

// ERROR MIDDLEWARE
export const errorMiddleware: Middleware = (api) => (next) => (action) => {
  try {
    if (isRejectedWithValue(action)) {
      const typedAction = action as EndpointAction;
      const endpointName = getEndpointName(typedAction);
      const errorMessage = typedAction.payload?.data?.message;

      if (!shouldIgnoreEndpoint(endpointName)) {
        api.dispatch(
          openNotification({
            type: "error",
            description: errorMessage || CONFIG.MESSAGES.ERROR,
            placement: "bottomLeft",
          })
        );
      }
    }
    return next(action);
  } catch (error) {
    console.error("Error Middleware Error:", error);
    return next(action);
  }
};
