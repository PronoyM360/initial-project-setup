import { Button, Space } from "antd";
import { IRoleDetails } from "../types/roleTypes";
import dayjs from "dayjs";
import Iconify from "../../../../config/IconifyConfig";

interface ColumnProps {
  handleUpdate: (record: IRoleDetails) => void;
  excludeActions?: boolean;
}

export const getRoleColumns = ({
  handleUpdate,
  excludeActions = false,
}: ColumnProps) => {
  const baseColumns = [
    {
      key: "role_name",
      title: "Role Name",
      dataIndex: "role_name",
      //   sorter: (a: IRoleDetails, b: IRoleDetails) =>
      //     a.role_name.localeCompare(b.role_name),
    },
    {
      key: "created_by",
      title: "Created By",
      dataIndex: "created_by",
    },
    {
      key: "create_date",
      title: "Create Date",
      dataIndex: "create_date",
      render: (date: string) => dayjs(date).format("DD-MM-YYYY HH:mm"),
      sorter: (a: IRoleDetails, b: IRoleDetails) =>
        dayjs(a.create_date).unix() - dayjs(b.create_date).unix(),
    },
  ];

  if (excludeActions) return baseColumns;

  return [
    ...baseColumns,
    {
      key: "actions",
      title: "Actions",
      render: (_: unknown, record: IRoleDetails) => (
        <Space>
          {record?.is_main_role === 0 ? (
            <Button
              type="primary"
              size="small"
              icon={<Iconify icon="material-symbols:edit-outline" />}
              onClick={() => handleUpdate(record)}
            />
          ) : (
            <Button
              type="primary"
              size="small"
              icon={<Iconify icon="material-symbols:edit-outline" />}
              disabled
            />
          )}
        </Space>
      ),
    },
  ];
};
