import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Flex,
  Layout,
  Space,
  Typography,
} from "antd";
import React from "react";
import Iconify from "../../../config/IconifyConfig";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../../modules/Settings/api/profileEndpoint";
import { useAppDispatch } from "../../../app/store";
import { clearAuth } from "../../../app/slice/authSlice";
import api from "../../../app/api/api";

interface Props {
  xs?: boolean;
  collapsed: boolean;
  handleCollapsed: () => void;
  handleOpen: () => void;
}
const LayoutHeader: React.FC<Props> = ({
  xs,
  collapsed,
  handleCollapsed,
  handleOpen,
}) => {
  const { data } = useGetProfileQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.clear();
    dispatch(api.util.resetApiState());
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <Layout.Header
      style={{
        padding: "0 1rem",
        lineHeight: 0,
        maxHeight: "100%",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 3,
      }}
    >
      <Flex align="center" justify="space-between" style={{ width: "100%" }}>
        <Space>
          {xs ? (
            <Button
              onClick={handleOpen}
              icon={<Iconify icon="heroicons-outline:menu-alt-1" />}
              type="default"
            />
          ) : (
            <Button
              onClick={handleCollapsed}
              icon={
                <Iconify
                  icon={
                    collapsed
                      ? "line-md:menu-unfold-right"
                      : "line-md:menu-fold-left"
                  }
                />
              }
              type="default"
            />
          )}

          <div>
            {/* <Typography.Text
              style={{
                display: "block",
                lineHeight: 1,
                fontSize: xs ? "11px" : "14px",
              }}
            >
              Welcome,
            </Typography.Text> */}
            <Typography.Text
              style={{
                display: "block",
                lineHeight: 1,
                fontWeight: 600,
                fontSize: xs ? "12px" : "16px",
              }}
            >
              Hello, {data?.data?.agency_name}
            </Typography.Text>
          </div>
        </Space>

        <Flex align="center" gap={20}>
          <Badge count={0}>
            <Button
              shape="circle"
              type="default"
              icon={
                <Iconify icon="material-symbols-light:notifications-unread-outline-rounded" />
              }
            />
          </Badge>

          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: <Link to="/settings">Settings</Link>,
                  icon: <Iconify icon="ic:round-settings" />,
                },
                {
                  key: "3",
                  label: "Logout",
                  icon: <Iconify icon="ant-design:logout-outlined" />,
                  danger: true,
                  onClick: handleLogout,
                },
              ],
            }}
            trigger={["click"]}
            arrow
          >
            <Avatar
              shape="circle"
              style={{ cursor: "pointer" }}
              src="https://i.pinimg.com/564x/70/f2/f6/70f2f613ee6b58351388385e0c657ed7.jpg"
            />
          </Dropdown>
        </Flex>
      </Flex>
    </Layout.Header>
  );
};

export default LayoutHeader;
