import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  Card,
  Avatar,
  Tag,
  Row,
  Col,
  Typography,
  Space,
  Form,
  Input,
  Alert,
  Flex,
  message,
  Upload,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useGetProfileQuery, useUpdateProfileMutation } from "../api/profileEndpoint";
import type { ProfileTypes } from "../types/profileTypes";
import CommonButton from "../../../common/Antd/Button/CommonButton";
import { phoneValidator } from "../../../utilities/validator";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";
import { admin_image, image_host_url } from "../../../utilities/images";

const { Title, Text } = Typography;

// Styles 
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "24px",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  } as CSSProperties,
  iconText: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  card: {
    marginBottom: "24px",
  },
  action: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
};

interface PhotoUploadState {
  loading: boolean;
  imageUrl: string;
  file: File | null;
}

const Profile = () => {
  const { data } = useGetProfileQuery();
  const [update, { isLoading, isSuccess, reset }] = useUpdateProfileMutation();
  const [form] = Form.useForm<ProfileTypes>();
  
  const [isEditing, setIsEditing] = useState(false);
  const [photoState, setPhotoState] = useState<PhotoUploadState>({
    loading: false,
    imageUrl: "",
    file: null,
  });

  const profile = data?.data;
  const displayPhotoUrl = photoState.imageUrl || (profile?.photo ? `${image_host_url}${profile.photo}` : admin_image);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue(profile);
      setPhotoState(prev => ({
        ...prev,
        imageUrl: profile.photo ? `${image_host_url}${profile.photo}` : admin_image,
      }));
    }
  }, [profile, form]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      setIsEditing(false);
    }
  }, [isSuccess, reset]);

  const handlePhotoChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setPhotoState(prev => ({ ...prev, loading: true }));
      return;
    }

    if (info.fileList[0]?.originFileObj) {
      const file = info.fileList[0].originFileObj;
      setPhotoState({
        loading: false,
        imageUrl: URL.createObjectURL(file),
        file,
      });
    }
  };

  const validatePhoto = (file: File) => {
    const isJpgOrPng = ["image/jpeg", "image/png"].includes(file.type);
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }

    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error("Image must be smaller than 2MB!");
    //   return false;
    // }
    return false; 
  };

  const handleSubmit = async (values: ProfileTypes) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone_number", values.phone_number);
    
    if (photoState.file) {
      formData.append("photo", photoState.file);
    }

    try {
      await update(formData);
    } catch (error) {
      console.log("error -- >", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.setFieldsValue(profile as ProfileTypes);
    setPhotoState(prev => ({
      ...prev,
      imageUrl: profile?.photo ? `${image_host_url}${profile.photo}` : "",
      file: null,
    }));
  };

  if (!profile) {
    return <div style={styles.container}>Loading...</div>;
  }

  const renderProfileView = () => (
    <>
      <Card style={styles.card}>
        <div style={styles.header}>
          <Avatar size={96} src={displayPhotoUrl} icon={<UserOutlined />} />
          <div style={styles.profileInfo}>
            <Title level={2} style={{ margin: 0 }}>{profile.name}</Title>
            <Text type="secondary">{data?.data?.role}</Text>
            <Tag color={profile.status ? "success" : "default"}>
              {profile.status ? "Active" : "Inactive"}
            </Tag>
          </div>
        </div>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={20}>
          <Card title="Contact Information" style={styles.card}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div style={styles.iconText}>
                <MailOutlined />
                <Text>{profile.email}</Text>
              </div>
              <div style={styles.iconText}>
                <PhoneOutlined />
                <Text>{profile.phone_number}</Text>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={4}>
          <div style={styles.action}>
            <CommonButton
              name="Edit Profile"
              icon="mdi:edit"
              onClick={() => setIsEditing(true)}
            />
          </div>
        </Col>
      </Row>
    </>
  );

  const renderEditForm = () => (
    <>
      <Alert message="Update Profile Information:" banner type="info" />
      <br />
      <Row gutter={[10, 10]}>
        <Col span={24} lg={12}>
          <Form.Item<ProfileTypes> name="name" label="Name">
            <Input variant="filled" placeholder="Enter your username" />
          </Form.Item>
        </Col>

        <Col span={24} lg={12}>
          <Form.Item<ProfileTypes>
            name="phone_number"
            label="Phone Number"
            rules={[{ validator: phoneValidator }]}
          >
            <Input
              addonBefore="+88"
              variant="filled"
              placeholder="Enter your phone number"
            />
          </Form.Item>
        </Col>
        <Col span={24} lg={4}>
          <Form.Item<ProfileTypes> name="photo" label="Profile Photo">
            <Upload
              name="photo"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={validatePhoto}
              onChange={handlePhotoChange}
            >
              <Avatar src={displayPhotoUrl} alt="avatar" style={{ width: "100%", height: "100%" }}>
                {!displayPhotoUrl && (
                  <div>
                    {photoState.loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Avatar>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Flex justify="end" gap={10}>
        <CommonButton
          danger
          name="Cancel"
          ghost
          icon="mdi:close"
          onClick={handleCancel}
        />
        <FormSubmit icon="" name="Update Profile" loading={isLoading} />
      </Flex>
    </>
  );

  return (
    <div style={styles.container}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {isEditing ? renderEditForm() : renderProfileView()}
      </Form>
    </div>
  );
};

export default Profile;