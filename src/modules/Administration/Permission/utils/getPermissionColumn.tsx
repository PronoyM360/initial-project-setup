import type { ColumnsType } from "antd/es/table";
import { IPermissionListTypes } from "../types/permissionTypes";
import dayjs from "dayjs";

//  permission columns
export const getPermissionColumns = (): ColumnsType<IPermissionListTypes> => {
  const columns: ColumnsType<IPermissionListTypes> = [
    // {
    //   title: "ID",
    //   dataIndex: "permission_id",
    //   key: "permission_id",
    //   width: 80,
    //   sorter: (a, b) => a.permission_id - b.permission_id,
    // },
    {
      title: "Permission Name",
      dataIndex: "permission_name",
      key: "permission_name",
    //   sorter: (a, b) => a.permission_name.localeCompare(b.permission_name),
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
      // width: 120,
    //   sorter: (a, b) => a.created_by.localeCompare(b.created_by),
    },
    {
      title: "Create Date",
      dataIndex: "create_date",
      key: "create_date",
      // width: 180,
    //   sorter: (a, b) =>
    //     dayjs(a.create_date).unix() - dayjs(b.create_date).unix(),
      render: (date: string) => dayjs(date).format("DD-MM-YYYY HH:mm:ss"),
    },
  ];

  return columns;
};
