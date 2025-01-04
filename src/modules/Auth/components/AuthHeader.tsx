import { Space, Typography } from "antd";
import React from "react";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { logo } from "../../../utilities/images";

interface Props {
  title: string;
  description: string;
}
const AuthHeader: React.FC<Props> = ({ title, description }) => {
  const { xl } = useBreakpoint();

  return (
    <React.Fragment>
      <Space
        direction="vertical"
        align="center"
        style={{ width: "100%", marginBottom: xl ? "2rem" : "1rem" }}
      >
        <div
          style={{
            width: xl ? "5rem" : "3rem",
            height: xl ? "5rem" : "3rem",
            overflow: "hidden",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <Typography.Text
          strong
          style={{
            display: "block",
            fontSize: xl ? "2rem" : "1.5rem",
          }}
        >
          {title}
        </Typography.Text>
        <Typography.Text
          type="secondary"
          style={{
            display: "block",
            textAlign: "center",
          }}
        >
          {description}
        </Typography.Text>
      </Space>
    </React.Fragment>
  );
};

export default AuthHeader;
