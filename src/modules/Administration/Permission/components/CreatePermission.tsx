import React from "react";
import { Form, Input, Button, Card, Space } from "antd";
import { ICreatePermissionTypes } from "../types/permissionTypes";
import { useCreatePermissionMutation } from "../api/permissionEndpoint";

const CreatePermission: React.FC = () => {
  const [form] = Form.useForm();
  const [createPermission, { isLoading }] = useCreatePermissionMutation();

  const handleSubmit = async (values: ICreatePermissionTypes) => {
    try {
      await createPermission(values).unwrap();
      form.resetFields();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err.data?.message || "Failed to create permission. Please try again.";
      console.log(errorMessage);
    }
  };

  return (
    <Card
      style={{
        maxWidth: 800,
        margin: "24px auto",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            label="Permission Name"
            name="permission_name"
            rules={[
              { required: true, message: "Please enter permission name!" },
            ]}
          >
            <Input
              placeholder="Enter permission name"
              style={{ width: "100%" }}
              maxLength={50}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ width: "100%" }}
            >
              Create Permission
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
};

export default CreatePermission;
