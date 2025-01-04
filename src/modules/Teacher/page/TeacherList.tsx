import { Button, Card, DatePicker, Table } from "antd";
import Select from "../../../common/Antd/Select";
import Container from "../../../common/Container/Container";
import useQueryParams from "../../../hooks/useQueryParams";

const TeacherList = () => {
  useQueryParams();
  return (
    <Card>
      <Container
        title="Teacher List"
        additionalButton={
          <>
            <Button>PDF</Button>
            <Button>Print</Button>
          </>
        }
        openModal={{ title: "sds", content: <>sdsd</> }}
        additionalContent={[
          <Select options={[]} width={"100%"} />,
          <DatePicker.RangePicker />,
        ]}
        content={
          <div style={{ marginTop: "12px" }}>
            <Table
              bordered
              size="small"
              dataSource={[
                {
                  name: "John Smith",
                  phone: "123-456-7890",
                  email: "john.smith@example.com",
                },
                {
                  name: "Jane Doe",
                  phone: "987-654-3210",
                  email: "jane.doe@example.com",
                },
                {
                  name: "Michael Johnson",
                  phone: "555-123-4567",
                  email: "michael.johnson@example.com",
                },
                {
                  name: "Emily Davis",
                  phone: "444-555-6666",
                  email: "emily.davis@example.com",
                },
                {
                  name: "Sarah Brown",
                  phone: "777-888-9999",
                  email: "sarah.brown@example.com",
                },
              ]}
              columns={[
                {
                  key: "1",
                  title: "Teacher Name",
                  dataIndex: "name",
                },
                {
                  key: "2",
                  title: "Teacher Phone",
                  dataIndex: "phone",
                },
                {
                  key: "3",
                  title: "Teacher Email",
                  dataIndex: "email",
                },
              ]}
            />
          </div>
        }
      />
    </Card>
  );
};

export default TeacherList;
