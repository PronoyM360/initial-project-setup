import { Avatar, Flex, Typography } from "antd";
import React from "react";
import { logo } from "../../../utilities/images";
import { useGetProfileQuery } from "../../../modules/Settings/api/profileEndpoint";

interface Props {
  collapsed: boolean;
}
const TopSection: React.FC<Props> = ({ collapsed }) => {
  const { data } = useGetProfileQuery();

  return (
    <div style={{ padding: "0.5rem 0.5rem 0 0.5rem" }}>
      <Flex
        align="center"
        justify={collapsed ? "center" : "flex-start"}
        gap={5}
      >
        <div
          style={{
            width: 50,
            height: 50,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Avatar src={logo} />
        </div>
        {!collapsed && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography.Text
              style={{ lineHeight: 1, color: "white", fontSize: "14px" }}
            >
              Management System
            </Typography.Text>
            <Typography.Text
              style={{
                fontSize: "16px",
                color: "#ffe001",
                textAlign: "center",
                marginTop: "5px",
                lineHeight: 1.2,
              }}
            >
              {data?.data?.role}
            </Typography.Text>
          </div>
        )}
      </Flex>
    </div>
  );
};

export default TopSection;
