import { Typography, Layout } from "antd";
import { logo } from "../../../utilities/images";
import "./AuthLayout.css";

const { Title } = Typography;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthLayout = ({ children, title }: any) => {
  const year = new Date().getFullYear();

  return (
    <div className="login-main">
      <div className="login-box">
        <div className="login-content">
          <div className="login-right">
            <div className="login-left">
              <img src={logo} alt="Auth illustration" />
            </div>

            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <Title level={3} style={{ color: "black", margin: 0 }}>
                {title}
              </Title>
            </div>

            {children}
          </div>

          <Layout.Footer className="auth-footer">
            <Typography.Paragraph style={{ margin: 0 }}>
              Copyright © {year} <strong>Management System.</strong>{" "}
              All rights reserved.
              <br />
              Designed and Developed by{" "}
              <strong>
                <a
                  href="https://m360ict.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "lightblue", textDecoration: "none" }}
                >
                  M360ICT
                </a>
              </strong>
              .
            </Typography.Paragraph>
          </Layout.Footer>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
