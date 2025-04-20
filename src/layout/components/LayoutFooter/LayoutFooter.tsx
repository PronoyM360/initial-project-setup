import { Layout, Typography } from "antd";
import React from "react";

const LayoutFooter: React.FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <Layout.Footer>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Typography.Paragraph>
          Copyright © {year} <strong>Management System.</strong> All
          rights reserved.
          <br />
          Designed and Developed by{" "}
          <strong>
            <a
              href="https://m360ict.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "none" }}
            >
              M360ICT
            </a>
            .
          </strong>{" "}
        </Typography.Paragraph>
      </div>
    </Layout.Footer>
  );
};

export default LayoutFooter;
