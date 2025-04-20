import React from "react";
import { Card, Col, Row, Statistic, Typography, Spin } from "antd";
import { useGetAllDashboardDataQuery } from "../api/dashboardEndpoint";
import {
  UserOutlined,
  BookOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  ReadOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { data, isLoading } = useGetAllDashboardDataQuery();
  const dashboardData = data?.data;

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      {/* Semester Section */}
      <Title level={3} style={{ marginBottom: 24 }}>
        Current Semester Information
      </Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={24} md={8}>
          <Card hoverable style={{ height: "100%" }}>
            <Statistic
              title="Semester Name"
              value={dashboardData?.semester_data?.currentSemester || "N/A"}
              valueStyle={{ color: "#1890ff", fontSize: "1.9rem" }}
              style={{ textAlign: "center" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ height: "100%" }}>
            <Statistic
              title="Semester Courses"
              value={
                dashboardData?.semester_data?.currentSemesterTotalCourse || 0
              }
              prefix={<BookOutlined />}
              valueStyle={{ color: "#52c41a", fontSize: "1.8rem" }}
              style={{ textAlign: "center" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ height: "100%" }}>
            <Statistic
              title="Semester Total Students"
              value={
                dashboardData?.semester_data?.currentSemesterTotalStudents || 0
              }
              prefix={<UserOutlined />}
              valueStyle={{ color: "#722ed1", fontSize: "1.8rem" }}
              style={{ textAlign: "center" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Statistics Section */}
      <Title level={3} style={{ marginBottom: 24 }}>
        Overall Statistics
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ height: "100%" }}>
            <Statistic
              title="Total Students"
              value={dashboardData?.statistics?.totalStudents || "0"}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#faad14", fontSize: "1.8rem" }}
              style={{ textAlign: "center" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ height: "100%" }}>
            <Statistic
              title="Running Students"
              value={dashboardData?.statistics?.currentTotalStudents || "0"}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#1890ff", fontSize: "1.8rem" }}
              style={{ textAlign: "center" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ height: "100%" }}>
            <Statistic
              title="Passed Students"
              value={dashboardData?.statistics?.totalPassedStudents || "0"}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a", fontSize: "1.8rem" }}
              style={{ textAlign: "center" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ height: "100%" }}>
            <Statistic
              title="Total Faculties"
              value={dashboardData?.statistics?.totalFaculties || "0"}
              prefix={<ReadOutlined />}
              valueStyle={{ color: "#fa541c", fontSize: "1.8rem" }}
              style={{ textAlign: "center" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ height: "100%" }}>
            <Statistic
              title="Total Courses"
              value={dashboardData?.statistics?.totalCourses || "0"}
              prefix={<BookOutlined />}
              valueStyle={{ color: "#13c2c2", fontSize: "1.8rem" }}
              style={{ textAlign: "center" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ height: "100%" }}>
            <Statistic
              title="Semesters Ended"
              value={dashboardData?.statistics?.totalSemesterEnded || "0"}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: "#eb2f96", fontSize: "1.8rem" }}
              style={{ textAlign: "center" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
