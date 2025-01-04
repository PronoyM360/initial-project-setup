import { notification } from "antd";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  clearNotification,
  NotificationState,
} from "../app/slice/notificationSlice";

// Centralized notification messages configuration
const NOTIFICATION_MESSAGES = {
  success: "Operation Completed Successfully",
  error: "An Error Occurred",
  warning: "Warning: Potential Issue",
  info: "Important Information",
} as const;

const NotificationConfig: React.FC = () => {
  const { type, description, placement } = useAppSelector(NotificationState);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();

  const notificationConfig = useMemo(() => {
    if (!type || !description) return null;

    return {
      message: NOTIFICATION_MESSAGES[type],
      description,
      placement: placement || "topRight",
    };
  }, [type, description, placement]);

  useEffect(() => {
    if (notificationConfig && type) {
      api[type](notificationConfig);

      dispatch(clearNotification());
    }
  }, [notificationConfig, type, api, dispatch]);

  return <>{contextHolder}</>;
};

export default React.memo(NotificationConfig);
