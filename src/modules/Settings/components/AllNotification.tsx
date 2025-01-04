import React from "react";
import { List, Avatar, Button, Typography, Space, Badge } from "antd";
import { BellOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const notifications = [
  {
    id: 1,
    title: "System Update",
    description: "The system will undergo maintenance at 2 AM.",
    read: false,
  },
  {
    id: 2,
    title: "New Feature Release",
    description: "Version 1.2.0 is now available with new features!",
    read: true,
  },
  {
    id: 3,
    title: "Security Alert",
    description: "Unusual login attempt detected. Please verify your account.",
    read: false,
  },
  {
    id: 4,
    title: "Welcome to Our Platform!",
    description:
      "Thank you for signing up! Explore our features and get started.",
    read: true,
  },
  {
    id: 5,
    title: "Password Change Successful",
    description: "Your password has been changed successfully.",
    read: true,
  },
];

const AllNotification: React.FC = () => {
  const markAllAsRead = () => {
    console.log("Mark all notifications as read");
  };

  const deleteAllNotifications = () => {
    console.log("All notifications deleted");
  };

  return (
    <div>
      <Title level={2}>
        <BellOutlined /> Notifications
      </Title>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<CheckOutlined />} onClick={markAllAsRead}>
          Mark All as Read
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={deleteAllNotifications}
        >
          Clear All
        </Button>
      </Space>
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="link"
                size="small"
                icon={<CheckOutlined />}
                disabled={item.read}
              >
                {item.read ? "Read" : "Mark as Read"}
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Badge dot={!item.read}>
                  <Avatar icon={<BellOutlined />} />
                </Badge>
              }
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default AllNotification;
