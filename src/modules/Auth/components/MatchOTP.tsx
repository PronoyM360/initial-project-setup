import { Form } from "antd";
import React from "react";
import { FormItemInputOTP } from "../../../common/Antd/Form/FormItems";
import { ForgotPasswordTypes } from "../types/authTypes";
import FormSubmit from "../../../common/Antd/Form/FormSubmit";

const MatchOTP: React.FC = () => {
  return (
    <React.Fragment>
      <Form layout="vertical">
        <FormItemInputOTP<ForgotPasswordTypes>
          name="otp"
          componentProps={{ style: { width: "100%" } }}
        />
        <FormSubmit name="Verify OTP" block />
      </Form>
    </React.Fragment>
  );
};

export default MatchOTP;
