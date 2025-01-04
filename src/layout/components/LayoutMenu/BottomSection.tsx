import { Avatar, Button, Card, Flex, Typography } from "antd";
import React from "react";
import Iconify from "../../../config/IconifyConfig";
import { logo } from "../../../utilities/images";

interface Props {
  collapsed: boolean;
}

const BottomSection: React.FC<Props> = ({ collapsed }) => {
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
                <Button type="text" icon={<Iconify icon="tabler:settings" />}>
                  Settings
                </Button>,
                <Button
                  type="text"
                  danger
                  icon={<Iconify icon="ant-design:logout-outlined" />}
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
            <Avatar src={logo} />
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
                Mehedi Hasan
              </Typography.Text>
              <Typography.Text
                style={{
                  color: "#cccccc",
                  fontSize: 11,
                  textAlign: collapsed ? "center" : "left",
                }}
              >
                Admin
              </Typography.Text>
            </div>
          )}
        </Flex>
      </Card>
    </div>
  );
};

export default BottomSection;
