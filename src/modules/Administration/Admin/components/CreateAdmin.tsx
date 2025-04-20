import React, { useState } from "react";
import {
  Form,
  Button,
  Space,
  message,
  Input,
  Select,
  Upload,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateAdminMutation } from "../api/adminEndpoint";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import { passwordValidator } from "../../../../utilities/validator";
import { ICreateAdminTypes } from "../types/adminTypes";
import { useGetAllRolesQuery } from "../../Role/api/roleEndpoint";

const CreateAdmin: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const { data: roleData, isLoading: isRoleLoading } = useGetAllRolesQuery();

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error("Image must be smaller than 2MB!");
    //   return false;
    // }
    return false; // Return false to prevent auto upload
  };

  const handleSubmit = async (values: Omit<ICreateAdminTypes, "photo">) => {
    try {
      const formData = new FormData();
      formData.append("role_id", values.role_id.toString());
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("name", values.name);
      if (values.phone_number) {
        formData.append("phone_number", values.phone_number);
      }
      if (fileList[0]?.originFileObj) {
        formData.append("photo", fileList[0].originFileObj);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await createAdmin(formData as any).unwrap();
      form.resetFields();
      setFileList([]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err.data?.message || "Failed to create admin. Please try again.";
      console.log(errorMessage);
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Row gutter={16}>
            {/* Full name */}
            <Col xs={24} sm={12}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please input full name!" }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>

            {/* Username */}
            <Col xs={24} sm={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input username!" },
                  {
                    min: 3,
                    message: "Username must be at least 3 characters!",
                  },
                ]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Role */}
            <Col xs={24} sm={12}>
              <Form.Item
                label="Role"
                name="role_id"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select
                  placeholder={
                    isRoleLoading ? "Loading roles..." : "Select role"
                  }
                  loading={isRoleLoading}
                >
                  {roleData?.data?.map((role) => (
                    <Select.Option key={role.role_id} value={role.role_id}>
                      {role.role_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {/* Phone Number */}
            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[
                  {
                    pattern: /^[0-9+-]+$/,
                    message: "Please enter a valid phone number!",
                  },
                ]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Email */}
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
            {/* Password */}
            <Col xs={24} sm={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input password!" },
                  { validator: passwordValidator },
                ]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Photo" name="photo">
            <Upload
              listType="picture"
              maxCount={1}
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ width: "100%" }}
            >
              Create Admin
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default CreateAdmin;
