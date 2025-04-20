import { Card } from "antd";
import { useGetAllRolesQuery } from "../api/roleEndpoint";
import { IRoleDetails } from "../types/roleTypes";
import Container from "../../../../common/Container/Container";
import Table from "../../../../common/Antd/Table";
import { useAppDispatch } from "../../../../app/store";
import UpdateRoleForm from "../components/UpdateRoleForm";
import { getRoleColumns } from "../utils/getRoleColumn";
import CreateRole from "../components/CreateRole";
import { showDrawer } from "../../../../app/slice/drawerSlice";

const RoleList = () => {
  const dispatch = useAppDispatch();
  const { data: roleData, isLoading, refetch } = useGetAllRolesQuery();

  const handleUpdate = (record: IRoleDetails) => {
    dispatch(
      showDrawer({
        title: "Update Role",
        content: <UpdateRoleForm record={record} />,
        width: 500,
      })
    );
  };

  const columns = getRoleColumns({ handleUpdate });

  return (
    <Card>
      <Container
        title="Role List"
        options={{
          showButton: true,
          showSearch: false,
          showFilter: false,
          placeholder: "Search roles...",
        }}
        openDrawer={{
          title: "Create Role Permission",
          content: <CreateRole />,
          width: 500,
        }}
        buttonLabel="Create Role"
        resetButton={false}
        content={
          <div style={{ marginTop: "12px" }}>
            <Table<IRoleDetails>
              rowKey="role_id"
              dataSource={roleData?.data}
              loading={isLoading}
              columns={columns}
              total={roleData?.total}
              refetch={refetch}
            />
          </div>
        }
      />
    </Card>
  );
};

export default RoleList;
