import { Button, Space, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Space direction="vertical" align="center">
        <Typography.Text
          type="danger"
          style={{ fontSize: "2rem", display: "block", textAlign: "center" }}
          strong
        >
          Access Denied!
        </Typography.Text>
        <Typography.Text
          type="secondary"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          You do not have the necessary permissions to access this page. Please
          contact your administrator for assistance.
        </Typography.Text>
        <Button
          size="small"
          shape="round"
          onClick={() => navigate({ pathname: "/" })}
          type="link"
          danger
        >
          GO HOME
        </Button>
      </Space>
    </div>
  );
};

export default AccessDenied;
