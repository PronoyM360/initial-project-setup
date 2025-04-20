import { Col, Form, FormProps, Input, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { ChangePasswordTypes } from "../types/profileTypes";
import { sanitizeFormValue } from "react-form-sanitization";
import { useChangePasswordMutation } from "../api/profileEndpoint";
import { passwordValidator } from "../../../utilities/validator";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";
import { useAppDispatch } from "../../../app/store";
import { clearAuth } from "../../../app/slice/authSlice";
import api from "../../../app/api/api";
import { useNavigate } from "react-router-dom";

const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [update, { isLoading, isSuccess }] = useChangePasswordMutation();
  const [form] = Form.useForm();

  const onFinish: FormProps<ChangePasswordTypes>["onFinish"] = async (
    values
  ) => {
    const data = sanitizeFormValue(values, {
      ignoreKeys: ["confirm_password"],
    });
    await update(data);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();

      dispatch(clearAuth());
      localStorage.clear();
      dispatch(api.util.resetApiState());
      localStorage.clear();
      navigate("/auth/login");
    }
  }, [dispatch, form, isSuccess, navigate]);

  return (
    <React.Fragment>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row>
          <Col span={24} lg={12}>
            <Typography.Title level={3}>Change Password</Typography.Title>
            <Typography.Text type="secondary">
              For your security, please choose a strong, unique password to
              protect your account. Avoid using easily guessable information and
              ensure your password is at least 8 characters long.
            </Typography.Text>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col span={24} lg={12}>
            <Form.Item<ChangePasswordTypes>
              name="old_password"
              label="Current Password"
              rules={[{ required: true }, { validator: passwordValidator }]}
            >
              <Input.Password placeholder="e.g: ********" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} lg={12}>
            <Form.Item<ChangePasswordTypes>
              name="new_password"
              label="Enter New Password"
              rules={[{ required: true }, { validator: passwordValidator }]}
            >
              <Input.Password placeholder="e.g: ********" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} lg={12}>
            <Form.Item<ChangePasswordTypes>
              name="confirm_password"
              label="Confirm New Password"
              dependencies={["new_password"]}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="e.g: ********" />
            </Form.Item>
          </Col>
        </Row>
        <FormSubmit loading={isLoading} name="Change Password" />
      </Form>
    </React.Fragment>
  );
};

export default ChangePassword;
