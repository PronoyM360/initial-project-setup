import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";
import Auth from "./Auth";

const SelectLogin: React.FC = () => {
  return (
    <Auth title="Please Select Login Type">
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12}>
          <Link to="/auth/admin-login">
            <Button
              type="primary"
              block
              style={{
                backgroundColor: "#051e85",
                borderColor: "#051e85",
                padding: "12px 0",
                fontWeight: 600,
              }}
            >
              Admin Login
            </Button>
          </Link>
        </Col>

        <Col xs={24} sm={12}>
          <a
            href="https://main.d2oyussocx1c85.amplifyapp.com/auth/login/"
            rel="noopener noreferrer"
          >
            <Button
              type="default"
              block
              style={{
                padding: "12px 0",
                fontWeight: 600,
              }}
            >
              Faculty Login
            </Button>
          </a>
        </Col>
      </Row>
    </Auth>
  );
};

export default SelectLogin;
