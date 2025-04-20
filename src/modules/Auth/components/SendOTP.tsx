import React from "react";
import { Alert, Form, Input, Typography, type FormProps } from "antd";
import { useSendOTPMutation } from "../api/authEndpoint";
import Iconify from "../../../config/IconifyConfig";
import { Link, useNavigate } from "react-router-dom";
import { AuthState, setMessage } from "../../../app/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { sanitizeFormValue } from "react-form-sanitization";
import { AuthError, ForgotPasswordTypes } from "../types/authTypes";
import { emailValidator } from "../../../utilities/validator";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";
import Auth from "../pages/Auth";

const SendOTP: React.FC = () => {
  const [sendOTP, { isLoading }] = useSendOTPMutation();
  const { message } = useAppSelector(AuthState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onFinish: FormProps<ForgotPasswordTypes>["onFinish"] = async (
    values
  ) => {
    const email = form.getFieldValue("email");
    const data = sanitizeFormValue({ ...values, type: "reset_admin" });

    try {
      const { success } = await sendOTP(data).unwrap();

      if (success) {
        navigate({
          pathname: "/auth/match-otp",
          search: `?email=${email}`,
        });
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
    <Auth title="Send OTP">
      {message && (
        <Typography.Paragraph>
          <Alert type="error" message={message} banner closable />
        </Typography.Paragraph>
      )}
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item<ForgotPasswordTypes>
          label="Email Address"
          name="email"
          rules={[{ required: true }, { validator: emailValidator }]}
        >
          <Input
            prefix={<Iconify icon="ant-design:user-outlined" />}
            placeholder="Enter Email Address"
          />
        </Form.Item>
        <FormSubmit name="Send OTP" loading={isLoading} />
      </Form>

      <Link to="/auth/login">Back to Login</Link>
    </Auth>
  );
};

export default SendOTP;
