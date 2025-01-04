import { Avatar, Flex, Typography } from "antd";
import React from "react";
import { logo } from "../../../utilities/images";

interface Props {
  collapsed: boolean;
}
const TopSection: React.FC<Props> = ({ collapsed }) => {
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
            <Typography.Text style={{ lineHeight: 1, color: "white" }}>
              Discovery Tours & Logistic
            </Typography.Text>
          </div>
        )}
      </Flex>
    </div>
  );
};

export default TopSection;
