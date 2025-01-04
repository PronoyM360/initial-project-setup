import { Form } from "antd";
import React from "react";
import { FormItemInput } from "../../../common/Antd/Form/FormItems";
import { ForgotPasswordTypes } from "../types/authTypes";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";

const SendOTP: React.FC = () => {
  return (
    <React.Fragment>
      <Form layout="vertical">
        <FormItemInput<ForgotPasswordTypes>
          name="email"
          label="Enter your email address"
          placeholder="e.g: some@example.com"
        />
        <FormSubmit name="Send OTP" block />
      </Form>
    </React.Fragment>
  );
};

export default SendOTP;
