import { Form } from "antd";
import React from "react";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";
import { FormItemPassword } from "../../../common/Antd/Form/FormItems";
import { ForgotPasswordTypes } from "../types/authTypes";

const ForgotPassword: React.FC = () => {
  return (
    <React.Fragment>
      <Form layout="vertical">
        <FormItemPassword<ForgotPasswordTypes>
          name="password"
          label="New Password"
        />
        <FormItemPassword<ForgotPasswordTypes>
          name="confirm_password"
          label="Confirm New Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
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
        />
        <FormSubmit name="Forgot Password" block />
      </Form>
    </React.Fragment>
  );
};

export default ForgotPassword;
