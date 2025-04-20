import { Card } from "antd";
import { useGetAllPermissionsQuery } from "../api/permissionEndpoint";
import Container from "../../../../common/Container/Container";
import { getPermissionColumns } from "../utils/getPermissionColumn";
import CreatePermission from "../components/CreatePermission";
import Table from "../../../../common/Antd/Table";
import { IPermissionListTypes } from "../types/permissionTypes";

const PermissionList = () => {
  const {
    data: permissionsData,
    isLoading,
    refetch,
  } = useGetAllPermissionsQuery();

  const columns = getPermissionColumns();

  return (
    <Card>
      <Container
        title="Permission List"
        openModal={{
          title: "Create Permission",
          content: (
            <>
              <CreatePermission />
            </>
          ),
        }}
        buttonLabel="Create Permission"
        options={{
          showButton: true,
          showSearch: true,
          showFilter: false,
          placeholder: "Search results...",
        }}
        resetButton={false}
        content={
          <div style={{ marginTop: "12px" }}>
            <Table<IPermissionListTypes>
              rowKey="permission_id"
              dataSource={permissionsData?.data}
              loading={isLoading}
              columns={columns}
              total={permissionsData?.total}
              refetch={refetch}
            />
          </div>
        }
      />
    </Card>
  );
};

export default PermissionList;
