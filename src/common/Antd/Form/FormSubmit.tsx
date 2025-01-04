import { Button, Form, type ButtonProps } from "antd";
import React from "react";
import Iconify from "../../../config/IconifyConfig";

interface Props extends ButtonProps {
  name: string;
  icon?: string;
}

const FormSubmit: React.FC<Props> = ({
  name,
  icon = "iconamoon:send-fill",
  ...rest
}) => {
  return (
    <Form.Item>
      <Button
        {...rest}
        type="primary"
        htmlType="submit"
        icon={<Iconify icon={icon} />}
      >
        {name}
      </Button>
    </Form.Item>
  );
};

export default FormSubmit;
