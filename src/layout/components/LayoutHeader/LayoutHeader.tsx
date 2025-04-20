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
import Marquee from "react-fast-marquee";
import { admin_image, image_host_url } from "../../../utilities/images";

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

  const profile = data?.data;
  const displayPhotoUrl = profile?.photo
    ? `${image_host_url}${profile.photo}`
    : admin_image;

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
            <Typography.Text
              style={{
                display: "block",
                lineHeight: 1,
                fontWeight: 600,
                fontSize: xs ? "12px" : "16px",
              }}
            >
              Hello, {data?.data?.username}
            </Typography.Text>
          </div>
        </Space>

        <div
          style={{
            width: "70%",
            overflow: "hidden",
            margin: "0 20px",
          }}
        >
          <Marquee
            style={{
              color: "black",
              minWidth: "100%",
              height: "40px",
              display: "flex",
              alignItems: "center",
            }}
            gradient={false}
            pauseOnHover={true}
            speed={40}
          >
            <span style={{ paddingRight: "50px" }}>
              Welcome to the{"  "}
              <span
                style={{
                  fontWeight: 600,
                }}
              >
                the website
              </span>
              . This platform is designed to empower faculty members with
              seamless tools for managing academic results, maintaining accurate
              records, and enhancing administrative efficiency.
            </span>
          </Marquee>
        </div>

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
                  label: <Link to="/profile">Profile</Link>,
                  icon: <Iconify icon="ion:person-circle-outline" />,
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
              src={displayPhotoUrl}
            />
          </Dropdown>
        </Flex>
      </Flex>
    </Layout.Header>
  );
};

export default LayoutHeader;
