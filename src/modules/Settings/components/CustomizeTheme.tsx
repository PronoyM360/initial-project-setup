import { Card, Col, Radio, Row, Space, Typography } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { ThemeState, toggleTheme } from "../../../app/slice/themeSlice";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { themePresets } from "../../../app/utilities/theme";

const CustomizeTheme: React.FC = () => {
  const { name } = useAppSelector(ThemeState);
  const dispatch = useAppDispatch();
  const { lg } = useBreakpoint();

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography.Text strong style={{ fontSize: lg ? "1.5rem" : "1rem" }}>
        Customize Theme
      </Typography.Text>
      <Typography.Text type="secondary">
        Adjust the theme to suit your mood or environment by selecting your
        preferred light or dark mode.
      </Typography.Text>
      <Row gutter={[10, 10]}>
        {themePresets.map((elements, index) => (
          <Col key={index} span={24} md={8} lg={6}>
            <Card
              hoverable
              bordered={false}
              style={{
                position: "relative",
                minHeight: "10rem",
                overflow: "hidden",
              }}
            >
              <Radio
                onChange={() => dispatch(toggleTheme({ ...elements }))}
                checked={elements.name === name}
              >
                <Typography.Text strong>{elements.name}</Typography.Text>
              </Radio>
              <div
                style={{
                  width: "10rem",
                  height: "10rem",
                  position: "absolute",
                  top: 0,
                  right: -50,
                  transform: "rotate(45deg)",
                  backgroundColor: elements.siderBg,
                  borderRadius: "0.5rem",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  width: "10rem",
                  height: "10rem",
                  position: "absolute",
                  top: 0,
                  right: -25,
                  transform: "rotate(45deg)",
                  backgroundColor: elements.colorPrimary,
                  borderRadius: "0.5rem",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                  zIndex: 1,
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Space>
  );
};

export default CustomizeTheme;
