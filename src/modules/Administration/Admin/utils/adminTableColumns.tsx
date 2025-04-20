import { Button, Image, Space } from "antd";
import { IAdminDetailsTypes } from "../types/adminTypes";
import Iconify from "../../../../config/IconifyConfig";
import { image_host_url } from "../../../../utilities/images";

interface ColumnProps {
  handleUpdate: (record: IAdminDetailsTypes) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDetails: any;
  excludeActions?: boolean;
}

export const getAdminColumns = ({
  handleUpdate,
  handleDetails,
  excludeActions = false,
}: ColumnProps) => {
  const baseColumns = [
    {
      key: "1",
      title: "User Name",
      dataIndex: "username",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Phone",
      dataIndex: "phone_number",
    },
    {
      key: "5",
      title: "Role",
      dataIndex: "role_name",
    },
    {
      key: "6",
      title: "Photo",
      dataIndex: "photo",
      render: (photo: string | null) =>
        photo ? (
          <Image src={`${image_host_url}${photo}`} width={40} height={40} />
        ) : (
          <Iconify
            icon="clarity:administrator-solid"
            width={40}
            height={40}
          />
        ),
    },
    {
      key: "7",
      title: "Status",
      dataIndex: "status",
      render: (status: boolean) => (
        <span
          style={{
            color: status ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {status ? "Active" : "Inactive"}
        </span>
      ),
    },
    // {
    //   key: "7",
    //   title: "Date",
    //   dataIndex: "created_at",
    //   render: (created_at: string) =>
    //     dayjs(created_at).format("DD-MM-YYYY HH:mm:ss"),
    // },
  ];

  if (excludeActions) return baseColumns;

  return [
    ...baseColumns,
    {
      key: "7",
      title: "Actions",
      render: (_: unknown, record: IAdminDetailsTypes) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<Iconify icon="lsicon:view-filled" />}
            onClick={() => handleDetails(record)}
          />
          {record?.is_main_user !== 1 ? (
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
