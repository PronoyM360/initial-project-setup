/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  Switch,
  Select,
  Upload,
  message,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import { useUpdateAdminMutation } from "../api/adminEndpoint";
import { IUpdateAdminFormProps, IUpdateAdminTypes } from "../types/adminTypes";
import { useGetAllRolesQuery } from "../../Role/api/roleEndpoint";
import { image_host_url } from "../../../../utilities/images";

const UpdateAdminForm: React.FC<IUpdateAdminFormProps> = ({ record }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();

  const { data: roleData, isLoading: isRoleLoading } = useGetAllRolesQuery();

  useEffect(() => {
    if (roleData?.data && record) {
      const matchingRole = roleData.data.find(
        (role) => role.role_name === record.role_name
      );

      form.setFieldsValue({
        username: record.username,
        name: record.name,
        phone_number: record.phone_number,
        role_id: matchingRole?.role_id || record.role_id,
        status: record.status,
        email: record.email,
      });
    }
  }, [form, record, roleData]);

  useEffect(() => {
    if (record.photo) {
      const photoUrl = record.photo.startsWith("http")
        ? record.photo
        : `${image_host_url}${record.photo}`;

      setFileList([
        {
          uid: "-1",
          name: "Current Photo",
          status: "done",
          url: photoUrl,
        },
      ]);
    }
  }, [record.photo]);

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
    return false;
  };

  const handleSubmit = async (values: IUpdateAdminTypes) => {
    try {
      const formData = new FormData();
      if (values.username) {
        formData.append("username", values.username.toLowerCase().trim());
      }
      if (values.name) formData.append("name", values.name);
      if (values.phone_number)
        formData.append("phone_number", values.phone_number);
      if (values.role_id) formData.append("role_id", values.role_id);
      if (values.status !== undefined) {
        formData.append("status", values.status.toString());
      }

      if (fileList[0]?.originFileObj) {
        formData.append("photo", fileList[0].originFileObj);
      }

      await updateAdmin({
        id: record.id,
        data: formData,
      }).unwrap();
    } catch (error: any) {
      const errorMessage = error.data?.message || "Failed to update admin";
      console.log(errorMessage);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ padding: "20px 0" }}
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
                placeholder={isRoleLoading ? "Loading roles..." : "Select role"}
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

        <Form.Item label="Status" name="status" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>

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
            Update Admin
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default UpdateAdminForm;
