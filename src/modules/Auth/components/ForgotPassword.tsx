import React from "react";
import { Alert, Form, FormProps, Input, Typography } from "antd";
import { useForgotPasswordMutation } from "../api/authEndpoint";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthState, setMessage } from "../../../app/slice/authSlice";
import { AuthError, ForgotPasswordTypes } from "../types/authTypes";
import { passwordValidator } from "../../../utilities/validator";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";
import Auth from "../pages/Auth";

const NewPassword: React.FC = () => {
  const [newPassword, { isLoading }] = useForgotPasswordMutation();
  const { message } = useAppSelector(AuthState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const [form] = Form.useForm();

  const onFinish: FormProps<ForgotPasswordTypes>["onFinish"] = async (
    values
  ) => {
    const token = searchParams.get("token") as string;
    const forgetData = {
      token: token,
      password: values.password,
    };

    try {
      const { success } = await newPassword(forgetData).unwrap();

      if (success) {
        navigate({ pathname: "/auth/login" });
      }
    } catch (error) {
      const { status, data } = error as AuthError;

      if (status === "FETCH_ERROR") {
        dispatch(
          setMessage(
            "Due to maintenance, our server is presently unavailable. Please try again later."
          )
        );
      } else {
        dispatch(setMessage(data.message));
      }
    }
  };

  return (
    <Auth title="Forgot Password">
      {message && (
        <Typography.Paragraph>
          <Alert type="error" message={message} banner closable />
        </Typography.Paragraph>
      )}
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        name="dependencies"
      >
        <Form.Item<ForgotPasswordTypes>
          label="Enter New Password"
          name="password"
          rules={[{ required: true }, { validator: passwordValidator }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<ForgotPasswordTypes>
          label="Confirm Password"
          name="confirm_password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            { validator: passwordValidator },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <FormSubmit name="New Password" loading={isLoading} />
      </Form>

      <Link to="/auth/login">Back to Login</Link>
    </Auth>
  );
};

export default NewPassword;
