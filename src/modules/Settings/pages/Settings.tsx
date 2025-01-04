import { Card, Tabs, TabsProps, Typography } from "antd";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useBreakpoint from "../../../hooks/useBreakpoint";
import Iconify from "../../../config/IconifyConfig";
import Profile from "./Profile";
import Themes from "./Themes";
import AllNotification from "../components/AllNotification";

const Settings: React.FC = () => {
  const { xl } = useBreakpoint();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab: string | null = searchParams.get("tab");

  const onChange: TabsProps["onChange"] = (key) => {
    navigate({ search: `?tab=${key}` });
  };

  return (
    <Card
      bordered={false}
      title={<Typography.Text>Account Settings</Typography.Text>}
    >
      <Tabs
        type="line"
        defaultActiveKey={activeTab || "profile-settings"}
        onChange={onChange}
        tabPosition={xl ? "left" : "top"}
        items={[
          {
            key: "profile-settings",
            label: "Profile Settings",
            icon: <Iconify icon="ion:person-circle-outline" />,
            children: <Profile />,
          },
          {
            key: "change-password",
            label: "Change Password",
            icon: <Iconify icon="ion:key-outline" />,
            children: <></>,
          },
          {
            key: "notification",
            label: "Notification",
            icon: <Iconify icon="ion:notifications-outline" />,
            children: <AllNotification />,
          },
          {
            key: "themes",
            label: "Themes",
            icon: <Iconify icon="ion:color-palette-outline" />,
            children: <Themes />,
          },
        ]}
      />
    </Card>
  );
};

export default Settings;
