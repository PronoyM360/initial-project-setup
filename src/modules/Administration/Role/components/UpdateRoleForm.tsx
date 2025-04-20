import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Row,
  Switch,
  Table,
  Typography,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useMemo, useState } from "react";
import {
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
} from "../api/roleEndpoint";
import { useGetAllPermissionsQuery } from "../../Permission/api/permissionEndpoint";
import { IRoleDetails } from "../types/roleTypes";

interface IPermissionListTypes {
  permission_id: number;
  permission_name: string;
}

interface PermissionState {
  read: number;
  write: number;
  update: number;
  delete: number;
}

interface PermissionsState {
  [key: number]: PermissionState;
}

interface FormValues {
  role_name: string;
  status: boolean;
}

interface IPermissionDisplay extends IPermissionListTypes, PermissionState {}

const UpdateRoleForm: React.FC<{ record: IRoleDetails }> = ({ record }) => {
  const [form] = Form.useForm<FormValues>();
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const {
    data: roleData,
    isLoading: isRoleLoading,
    error: roleError,
  } = useGetRoleByIdQuery(record.role_id, { skip: !record.role_id });

  const {
    data: permissionData,
    isLoading: isPermissionLoading,
    error: permissionError,
  } = useGetAllPermissionsQuery();

  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();

  const { updatedPermissions } = useMemo(() => {
    const allPermissions = (permissionData?.data ||
      []) as IPermissionListTypes[];
    const currentPermissions = roleData?.data?.permissions || [];

    const updated = allPermissions
      .map((permission) => {
        const existingPerm = currentPermissions.find(
          (rp: { permission_id: number }) =>
            rp.permission_id === permission.permission_id
        );
        return {
          ...permission,
          read: existingPerm?.read || 0,
          write: existingPerm?.write || 0,
          update: existingPerm?.update || 0,
          delete: existingPerm?.delete || 0,
        };
      })
      .sort((a, b) => a.permission_name.localeCompare(b.permission_name));

    return {
      updatedPermissions: updated,
      rolePermissions: currentPermissions,
    };
  }, [permissionData?.data, roleData?.data?.permissions]);

  // Permission state management
  const [permissionState, setPermissionState] = useState<PermissionsState>({});

  useEffect(() => {
    if (updatedPermissions.length > 0) {
      const initialState = updatedPermissions.reduce(
        (acc, { permission_id, read, write, update, delete: del }) => {
          acc[permission_id] = { read, write, update, delete: del };
          return acc;
        },
        {} as PermissionsState
      );
      setPermissionState(initialState);

      // Check if all permissions are selected
      const allSelected = Object.values(initialState).every(
        (permission) =>
          permission.read === 1 &&
          permission.write === 1 &&
          permission.update === 1 &&
          permission.delete === 1
      );
      setSelectAll(allSelected);
    }
  }, [updatedPermissions]);

  // Set initial form values
  useEffect(() => {
    if (roleData?.data) {
      form.setFieldsValue({
        role_name: record.role_name,
        status: roleData.data.status === 1,
      });
    }
  }, [roleData?.data, record.role_name, form]);

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

  const columns: ColumnsType<IPermissionDisplay> = [
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

  const onFinish = async (values: FormValues) => {
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
        return;
      }

      const formattedPermissions = updatedPermissions.map(
        ({ permission_id }) => ({
          permission_id,
          ...permissionState[permission_id],
        })
      );

      await updateRole({
        id: record.role_id,
        role_name: values.role_name,
        status: values.status ? 1 : 0,
        add_permissions: formattedPermissions,
      }).unwrap();
    } catch (error) {
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to update role. Please try again."
      );
    }
  };

  if (roleError || permissionError) {
    return (
      <Typography.Text type="danger">
        Error loading data. Please try again later.
      </Typography.Text>
    );
  }

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" className="w-full">
      <Form.Item
        label="Role Name"
        name="role_name"
        rules={[
          { required: true, message: "Please input role name!" },
          { whitespace: true, message: "Role name cannot be empty!" },
          { min: 2, message: "Role name must be at least 2 characters!" },
        ]}
      >
        <Input placeholder="Provide role name e.g. Admin" />
      </Form.Item>

      <Row align="middle" gutter={10} style={{ marginBottom: 10 }}>
        <Col>
          <Typography.Text>Role Status:</Typography.Text>
        </Col>
        <Col>
          <Form.Item name="status" valuePropName="checked" noStyle>
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <div style={{ marginBottom: 10 }}>
        <Checkbox onChange={selectAllPermission} checked={selectAll}>
          Select All Permissions
        </Checkbox>
      </div>

      <Table
        loading={isRoleLoading || isPermissionLoading}
        dataSource={updatedPermissions}
        columns={columns}
        rowKey="permission_id"
        pagination={false}
        size="middle"
        bordered
        style={{ marginBottom: 10 }}
      />

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isUpdating}
          style={{ marginTop: 10 , width: "100%"}}
        >
          Update Role
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateRoleForm;
