import { Alert, Checkbox, Flex, Form, Typography, type FormProps } from "antd";
import React from "react";
import { AuthError, LoginTypes } from "../types/authTypes";
import Iconify from "../../../config/IconifyConfig";
import {
  emailValidator,
  passwordValidator,
} from "../../../utilities/validator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";
import {
  FormItemInput,
  FormItemPassword,
} from "../../../common/Antd/Form/FormItems";
import { useLoginMutation } from "../api/authEndpoint";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import {
  AuthState,
  clearMessage,
  setMessage,
} from "../../../app/slice/authSlice";
import { sanitizeFormValue } from "react-form-sanitization";

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { message } = useAppSelector(AuthState);
  const [form] = Form.useForm();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const from: string = state?.from?.pathname || "/";

  const onFinish: FormProps<LoginTypes>["onFinish"] = async (values) => {
    try {
      const data = sanitizeFormValue(values, { ignoreKeys: ["remember"] });
      const { success } = await login(data).unwrap();
      if (success) {
        navigate(from, { replace: true });
        dispatch(clearMessage());
      }
    } catch (error) {
      const { status, data } = error as AuthError;
      if (status === "FETCH_ERROR") {
        dispatch(
          setMessage(
            "Our servers are temporarily unavailable due to maintenance. Please try again later."
          )
        );
      } else {
        dispatch(setMessage(data.message));
      }
    }
  };

  return (
    <React.Fragment>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ remember: true }}
      >
        {message && (
          <Typography.Paragraph>
            <Alert type="error" message={message} banner closable />
          </Typography.Paragraph>
        )}
        <FormItemInput<LoginTypes>
          name="email"
          validator={emailValidator}
          componentProps={{
            type: "email",
            placeholder: "e.g: some@example.com",
            prefix: <Iconify icon="ant-design:user-outlined" />,
          }}
        />

        <FormItemPassword<LoginTypes>
          name="password"
          validator={passwordValidator}
          componentProps={{
            prefix: <Iconify icon="ant-design:lock-outlined" />,
            placeholder: "e.g: ********",
          }}
        />

        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: "1rem" }}
        >
          <Form.Item<LoginTypes>
            name="remember"
            valuePropName="checked"
            noStyle
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link to="/auth/send-otp">Forgot Password!</Link>
        </Flex>

        <FormSubmit
          loading={isLoading}
          name="Login"
          block
          icon="ant-design:login-outlined"
        />
      </Form>
    </React.Fragment>
  );
};

export default Login;
