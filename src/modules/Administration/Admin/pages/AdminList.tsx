/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../../../app/store";
import { useGetAllAdminQuery } from "../api/adminEndpoint";
import { showModal } from "../../../../app/slice/modalSlice";
import UpdateAdminForm from "../components/UpdateAdminForm";
import { IAdminDetailsTypes } from "../types/adminTypes";
import { getAdminColumns } from "../utils/adminTableColumns";
import Container from "../../../../common/Container/Container";
import CreateAdmin from "../components/CreateAdmin";
import PDFButton from "../../../../common/Antd/Button/PDFButton";
import PrintButton from "../../../../common/Antd/Button/PrintButton";
import Table from "../../../../common/Antd/Table";
import A4PageContainer from "../../../../common/A4PageContainer/A4PageContainer";
import A4PDFContainer from "../../../../common/A4PageContainer/A4PdfContainer";
import AdminDetails from "../components/AdminDetails";
import { IFilterDataTypes } from "../../../../common/Types/CommonTypes";
import useQueryParams from "../../../../hooks/useQueryParams";
import Select from "../../../../common/Antd/Select";

const AdminList = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const dispatch = useAppDispatch();

  // Filter State
  const [filterDate, setFilterData] = useState<IFilterDataTypes>({
    status: "true",
  });
  const filters = useQueryParams(filterDate);

  const {
    data: getAllAdmin,
    isLoading,
    refetch,
  } = useGetAllAdminQuery(filters);

  const handleUpdate = (record: IAdminDetailsTypes) => {
    dispatch(
      showModal({
        title: "Update Admin",
        content: <UpdateAdminForm record={record} />,
        width: 600,
      })
    );
  };
  const handleDetails = (record: IAdminDetailsTypes) => {
    dispatch(
      showModal({
        title: "Admin Details",
        content: <AdminDetails record={record} />,
        width: 800,
      })
    );
  };

  const handlePDFClick = () => {
    setIsGeneratingPDF(true);
    setShowPDF(true);
    setTimeout(() => {
      setIsGeneratingPDF(false);
    }, 100);
  };

  const columns = getAdminColumns({ handleUpdate, handleDetails });
  const printColumns = getAdminColumns({
    handleUpdate,
    handleDetails,
    excludeActions: true,
  });

  return (
    <Card>
      <Container
        title="Admin List"
        options={{
          showButton: true,
          showSearch: true,
          showFilter: true,
          placeholder: "Search Admin...",
        }}
        openModal={{
          title: "Create Admin",
          content: (
            <>
              <CreateAdmin />
            </>
          ),
          width: 800,
        }}
        additionalButton={
          <div style={{ display: "none" }}>
            <PDFButton
              onClick={handlePDFClick}
              loading={isGeneratingPDF}
              disabled={isGeneratingPDF}
            />
            <PrintButton onClick={() => setShowPrint(true)} />
          </div>
        }
        // Filter
        additionalContent={[
          <Select
            value={filters.status || "Active"}
            onChange={(value) =>
              setFilterData((prev) => ({ ...prev, status: value }))
            }
            allowClear={false}
            options={[
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" },
            ]}
          />,
        ]}
        buttonLabel="Create Admin"
        resetButton={false}
        content={
          <div style={{ marginTop: "12px" }}>
            <Table<IAdminDetailsTypes>
              rowKey="id"
              dataSource={getAllAdmin?.data as any}
              loading={isLoading}
              columns={columns}
              total={getAllAdmin?.total}
              refetch={refetch}
            />

            {showPrint && (
              <A4PageContainer
                documentTitle="Course List"
                onComplete={() => setShowPrint(false)}
              >
                <Table<IAdminDetailsTypes>
                  rowKey="id"
                  dataSource={getAllAdmin?.data as any}
                  loading={isLoading}
                  columns={printColumns}
                  total={getAllAdmin?.total}
                  refetch={refetch}
                />
              </A4PageContainer>
            )}

            {showPDF && (
              <A4PDFContainer
                data={getAllAdmin?.data as any}
                columns={printColumns}
                documentTitle="Student Courses List"
                onComplete={() => handlePDFClick}
              />
            )}
          </div>
        }
      />
    </Card>
  );
};

export default AdminList;
