import { Avatar, Button, Card, Flex, Typography } from "antd";
import React from "react";
import Iconify from "../../../config/IconifyConfig";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/store";
import { clearAuth } from "../../../app/slice/authSlice";
import api from "../../../app/api/api";
import { useGetProfileQuery } from "../../../modules/Settings/api/profileEndpoint";
import { admin_image, image_host_url } from "../../../utilities/images";

interface Props {
  collapsed: boolean;
}

const BottomSection: React.FC<Props> = ({ collapsed }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useGetProfileQuery();

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.clear();
    dispatch(api.util.resetApiState());
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <div style={{ padding: "0.5rem" }}>
      <Card
        size="small"
        bordered={false}
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
        styles={{
          actions: {
            background: "transparent",
            border: "none",
          },
        }}
        actions={
          collapsed
            ? undefined
            : [
                <Button
                  type="text"
                  style={{ color: "white" }}
                  icon={<Iconify icon="ion:person-circle-outline" />}
                >
                  <Link to="/profile" style={{ color: "white" }}>
                    Profile
                  </Link>
                </Button>,
                <Button
                  type="text"
                  danger
                  icon={<Iconify icon="ant-design:logout-outlined" />}
                  onClick={handleLogout}
                >
                  Log out
                </Button>,
              ]
        }
      >
        <Flex
          align="center"
          justify="flex-start"
          gap={3}
          style={{
            flexDirection: collapsed ? "column" : "row",
            alignItems: collapsed ? "center" : "center",
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Avatar
              src={
                data?.data?.photo
                  ? image_host_url + data?.data?.photo
                  : admin_image
              }
            />
          </div>

          {!collapsed && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: collapsed ? 0 : undefined,
              }}
            >
              <Typography.Text
                strong
                style={{
                  color: "white",
                  lineHeight: 1,
                  textAlign: collapsed ? "center" : "left",
                }}
              >
                {data?.data?.name}
              </Typography.Text>
            </div>
          )}
        </Flex>
      </Card>
    </div>
  );
};

export default BottomSection;
