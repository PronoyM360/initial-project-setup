import { Alert, Form, Input, Typography, type FormProps } from "antd";
import React from "react";
import { useMatchOTPMutation } from "../api/authEndpoint";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { AuthState, setMessage } from "../../../app/slice/authSlice";
import { sanitizeFormValue } from "react-form-sanitization";
import { AuthError, ForgotPasswordTypes } from "../types/authTypes";
import { otpValidator } from "../../../utilities/validator";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";
import Auth from "../pages/Auth";

const MatchOTP: React.FC = () => {
  const [matchOTP, { isLoading }] = useMatchOTPMutation();
  const { message } = useAppSelector(AuthState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form] = Form.useForm();
  const email = searchParams.get("email") as string;

  const onFinish: FormProps<ForgotPasswordTypes>["onFinish"] = async (
    values
  ) => {
    const result = sanitizeFormValue({
      ...values,
      type: "reset_admin",
      email: email,
    });

    try {
      const { success, token } = await matchOTP(result).unwrap();
      if (success) {
        navigate({
          pathname: "/auth/forgot-password",
          search: `?email=${email}&token=${token}`,
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
    <Auth title="Match OTP">
      {/* <AuthHeader
        title="Match OTP"
        description={`A 6 digit code has been sent to ${email} This OTP will be valid for next 3 minutes.`}
        timer={true}
      /> */}

      {message && (
        <Typography.Paragraph>
          <Alert type="error" message={message} banner closable />
        </Typography.Paragraph>
      )}

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item<ForgotPasswordTypes>
          label="Enter your OTP"
          name="otp"
          rules={[{ required: true }, { validator: otpValidator }]}
        >
          <Input.OTP style={{ width: "100%" }} />
        </Form.Item>
        <FormSubmit name="Verify OTP" loading={isLoading} />
      </Form>

      <Link to="/auth/send-otp">Resend OTP</Link>
    </Auth>
  );
};

export default MatchOTP;
