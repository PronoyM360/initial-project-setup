import React from "react";
import { Descriptions, Image, Avatar, Space } from "antd";
import dayjs from "dayjs";
import { IAdminDetailsTypes } from "../types/adminTypes";
import { image_host_url } from "../../../../utilities/images";
import { useGetAdminByIdQuery } from "../api/adminEndpoint";

interface AdminDetailsProps {
  record: IAdminDetailsTypes;
}

const AdminDetails: React.FC<AdminDetailsProps> = ({ record }) => {
  const { data } = useGetAdminByIdQuery(record.id as string);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        {record.photo ? (
          <Image
            src={`${image_host_url}${record.photo}`}
            alt={record.name}
            width={120}
            height={120}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Avatar size={120} style={{ fontSize: "36px" }}>
            {record.name?.charAt(0)?.toUpperCase()}
          </Avatar>
        )}
      </div>

      <Space direction="vertical" style={{ width: "100%" }}>
        <Descriptions column={2} bordered labelStyle={{ fontWeight: 500 }}>
          <Descriptions.Item label="Role Name">
            {record.role_name}
          </Descriptions.Item>
          <Descriptions.Item label="Username">
            {record.username}
          </Descriptions.Item>
          <Descriptions.Item label="Admin Name">
            {record.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{record.email}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {record.phone_number || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <span
              style={{
                color: record.status ? "#52c41a" : "#f5222d",
                fontWeight: "bold",
              }}
            >
              {record.status ? "Active" : "Inactive"}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {dayjs(record.created_at).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Created By">
            {data?.data?.created_by}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </div>
  );
};

export default AdminDetails;
