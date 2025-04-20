import { Button, Checkbox, Form, Input, message } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useGetAllPermissionsQuery } from "../../Permission/api/permissionEndpoint";
import { useCreateRoleMutation } from "../api/roleEndpoint";
import {
  FormValues,
  Permission,
  PermissionsState,
  PermissionState,
} from "../types/roleTypes";
import Table from "../../../../common/Antd/Table";

const CreateRole: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const [createRole] = useCreateRoleMutation();

  const {
    data: permissionData,
    isLoading: isPermissionLoading,
    refetch,
    error: permissionError,
  } = useGetAllPermissionsQuery();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const permission_list: Permission[] = permissionData?.data || [];

  const [permissionState, setPermissionState] = useState<PermissionsState>({});

  useEffect(() => {
    if (permission_list?.length > 0) {
      const initialPermissionsState = permission_list.reduce(
        (acc, { permission_id }) => {
          acc[permission_id] = { read: 0, write: 0, update: 0, delete: 0 };
          return acc;
        },
        {} as PermissionsState
      );
      setPermissionState(initialPermissionsState);
    }
  }, [permission_list]);

  // Check if all permissions are selected
  useEffect(() => {
    if (Object.keys(permissionState).length > 0) {
      const allSelected = Object.values(permissionState).every(
        (permission) =>
          permission.read === 1 &&
          permission.write === 1 &&
          permission.update === 1 &&
          permission.delete === 1
      );
      setSelectAll(allSelected);
    }
  }, [permissionState]);

  const handlePermissionChange = (
    id: number,
    action: keyof PermissionState
  ): void => {
    setPermissionState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [action]: prevState[id]?.[action] === 1 ? 0 : 1,
      },
    }));
  };

  const selectAllPermission = (e: CheckboxChangeEvent): void => {
    const checked = e.target.checked;
    setSelectAll(checked);

    setPermissionState((prevState) => {
      const updatedState = Object.keys(prevState).reduce(
        (acc, permissionId) => {
          acc[Number(permissionId)] = {
            read: checked ? 1 : 0,
            write: checked ? 1 : 0,
            update: checked ? 1 : 0,
            delete: checked ? 1 : 0,
          };
          return acc;
        },
        {} as PermissionsState
      );
      return updatedState;
    });
  };

  const resetForm = () => {
    form.resetFields();
    setPermissionState(
      permission_list.reduce((acc, { permission_id }) => {
        acc[permission_id] = { read: 0, write: 0, update: 0, delete: 0 };
        return acc;
      }, {} as PermissionsState)
    );
    setSelectAll(false);
  };

  const onFinish = async (values: FormValues): Promise<void> => {
    setLoading(true);
    try {
      const hasSelectedPermissions = Object.values(permissionState).some(
        (permission) =>
          permission.read === 1 ||
          permission.write === 1 ||
          permission.update === 1 ||
          permission.delete === 1
      );

      if (!hasSelectedPermissions) {
        message.error("Please select at least one permission");
        setLoading(false);
        return;
      }

      const formattedPermissions = permission_list
        .map(({ permission_id }) => ({
          permission_id,
          ...permissionState[permission_id],
        }))
        .filter(
          (permission) =>
            permission.read === 1 ||
            permission.write === 1 ||
            permission.update === 1 ||
            permission.delete === 1
        );

      const body = {
        role_name: values.role_name.trim(),
        permissions: formattedPermissions,
      };

      const response = await createRole(body).unwrap();

      if (response) {
        message.success("Role has been successfully created");
        resetForm();
      }
    } catch (error) {
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to create role. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<Permission> = [
    {
      title: "Permission Name",
      dataIndex: "permission_name",
      key: "permission_name",
      width: "40%",
    },
    {
      title: "Read",
      dataIndex: "read",
      key: "read",
      width: "15%",
      render: (_, record) => (
        <Checkbox
          checked={permissionState[record.permission_id]?.read === 1}
          onChange={() => handlePermissionChange(record.permission_id, "read")}
        />
      ),
    },
    {
      title: "Write",
      dataIndex: "write",
      key: "write",
      width: "15%",
      render: (_, record) => (
        <Checkbox
          checked={permissionState[record.permission_id]?.write === 1}
          onChange={() => handlePermissionChange(record.permission_id, "write")}
        />
      ),
    },
    {
      title: "Update",
      dataIndex: "update",
      key: "update",
      width: "15%",
      render: (_, record) => (
        <Checkbox
          checked={permissionState[record.permission_id]?.update === 1}
          onChange={() =>
            handlePermissionChange(record.permission_id, "update")
          }
        />
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      width: "15%",
      render: (_, record) => (
        <Checkbox
          checked={permissionState[record.permission_id]?.delete === 1}
          onChange={() =>
            handlePermissionChange(record.permission_id, "delete")
          }
        />
      ),
    },
  ];

  if (permissionError) {
    return <div>Error loading permissions. Please try again later.</div>;
  }

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ width: "100%" }}
      >
        <Form.Item
          label="Role Name"
          name="role_name"
          rules={[{ required: true, message: "Please input role name!" }]}
          style={{ marginBottom: "20px" }}
        >
          <Input placeholder="Enter the role name" />
        </Form.Item>

        <div style={{ marginBottom: "16px" }}>
          <Checkbox onChange={selectAllPermission} checked={selectAll}>
            Select All Permissions
          </Checkbox>
        </div>

        <Table
          rowKey="permission_id"
          dataSource={permissionData?.data}
          loading={isPermissionLoading}
          columns={columns}
          total={permissionData?.total}
          refetch={refetch}
        />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            Create Role
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateRole;
