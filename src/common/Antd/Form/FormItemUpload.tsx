import { useState } from "react";
import { Col, Form, Upload, Button } from "antd";
import type { UploadProps, FormItemProps } from "antd";
import type { RuleObject } from "antd/es/form";
import Iconify from "../../../config/IconifyConfig";

type ListType = "picture-card" | "picture" | "picture-circle" | "text";
type AcceptType = "image/*" | ".doc,.docx,.pdf";

interface ColProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  flex?: string | number;
  order?: number;
  span?: number;
  offset?: number;
}

interface CustomUploadProps extends UploadProps {
  accept?: AcceptType;
  listType?: ListType;
  maxSize?: number;
}

interface CommonFormItemProps<T> extends Omit<FormItemProps, "name"> {
  placeholder?: string;
  label?: string;
  name: keyof T | (keyof T)[];
  required?: boolean;
  validator?: (rule: RuleObject, value: string) => Promise<void> | void;
  colProps?: ColProps;
}

function FormItemUpload<T extends Record<string, unknown>>({
  name,
  label,
  required = true,
  validator,
  colProps = { span: 24 },
  componentProps = {},
  ...formItemProps
}: CommonFormItemProps<T> & { componentProps?: CustomUploadProps }) {
  const [error, setError] = useState<string | null>(null);

  const handleBeforeUpload: CustomUploadProps["beforeUpload"] = (file) => {
    const maxSize = componentProps?.maxSize || 2; // Default to 2MB
    const isLtMaxSize = file.size / 1024 / 1024 < maxSize;

    if (!isLtMaxSize) {
      setError(
        `File size must be less than ${maxSize} MB. Please select a smaller file.`
      );
      return Upload.LIST_IGNORE;
    }

    setError(null);
    return false; // Prevent auto-upload
  };

  const rules = [
    ...(required
      ? [{ required, message: `${label || "This field"} is required.` }]
      : []),
    ...(validator ? [{ validator }] : []),
  ];

  return (
    <Col {...colProps}>
      <Form.Item
        label={label}
        name={name as unknown}
        rules={rules}
        validateStatus={error ? "error" : undefined}
        help={error}
        {...formItemProps}
      >
        <Upload
          {...componentProps}
          beforeUpload={handleBeforeUpload}
          showUploadList={{
            showRemoveIcon: true,
            showPreviewIcon: false,
            showDownloadIcon: false,
          }}
        >
          {componentProps?.listType === "picture-card" ||
          componentProps?.listType === "picture-circle" ? (
            <Iconify icon="ant-design:plus-outlined" />
          ) : (
            <Button
              type="default"
              icon={<Iconify icon="ant-design:plus-outlined" />}
            >
              Click to Upload
            </Button>
          )}
        </Upload>
      </Form.Item>
    </Col>
  );
}

export default FormItemUpload;
