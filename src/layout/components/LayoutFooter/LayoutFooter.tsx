import { Flex, Layout, Typography } from "antd";
import React from "react";
import useBreakpoint from "../../../hooks/useBreakpoint";

const LayoutFooter: React.FC = () => {
  const year: number = new Date().getFullYear();
  const { xs } = useBreakpoint();

  return (
    <Layout.Footer>
      <div
        style={{
          display: "flex",
          justifyContent: xs ? "center" : "space-between",
          flexDirection: xs ? "column" : "row",
          textAlign: "center",
        }}
      >
        <Typography.Paragraph>
          Copyright © {year} <strong>M360ICT.</strong> All rights reserved.
        </Typography.Paragraph>
        <Flex
          justify={xs ? "center" : "flex-end"}
          gap={xs ? "middle" : "large"}
        >
          <Typography.Link type="secondary">Support</Typography.Link>
          <Typography.Link type="secondary">About</Typography.Link>
        </Flex>
      </div>
    </Layout.Footer>
  );
};

export default LayoutFooter;
