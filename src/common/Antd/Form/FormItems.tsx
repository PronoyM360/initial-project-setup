import {
  Col,
  Form,
  Input,
  InputNumber,
  GetProps,
  Radio,
  Select,
  DatePicker,
  FormItemProps as AntFormItemProps,
} from "antd";
import { RuleObject } from "antd/es/form";

type ExtractNameType<T> = T extends Record<string, unknown> ? keyof T : string;

interface CommonFormItemProps<T> extends Omit<AntFormItemProps, "name"> {
  placeholder?: string;
  label?: string;
  name: ExtractNameType<T> | ExtractNameType<T>[];
  required?: boolean;
  validator?: (rule: RuleObject, value: string) => Promise<void> | void;
  colProps?: ColProps;
}

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

function createFormItem<T extends Record<string, unknown>, ComponentProps>(
  Component: React.ComponentType<ComponentProps>,
  defaultColProps = { span: 24 }
) {
  return function FormItemGeneric<FormTypes = T>({
    placeholder,
    label,
    name,
    required = true,
    validator,
    colProps = defaultColProps,
    componentProps = {} as ComponentProps,
    ...formItemProps
  }: CommonFormItemProps<FormTypes> & { componentProps?: ComponentProps }) {
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
          {...formItemProps}
        >
          <Component
            {...(placeholder ? { placeholder } : {})}
            {...componentProps}
          />
        </Form.Item>
      </Col>
    );
  };
}

// FORM ITEM INPUT
export const FormItemInput = createFormItem<
  Record<string, unknown>,
  GetProps<typeof Input>
>(Input, { span: 24 });

// FORM ITEM PASSWORD
export const FormItemPassword = createFormItem<
  Record<string, unknown>,
  GetProps<typeof Input.Password>
>(Input.Password, { span: 24 });

// FORM ITEM TEXT AREA
export const FormItemTextarea = createFormItem<
  Record<string, unknown>,
  GetProps<typeof Input.TextArea>
>(Input.TextArea, { span: 24 });

// FORM ITEM INPUT NUMBER
export const FormItemInputNumber = createFormItem<
  Record<string, unknown>,
  GetProps<typeof InputNumber>
>(
  (props) => <InputNumber type="number" style={{ width: "100%" }} {...props} />,
  { span: 24 }
);

// FORM ITEM INPUT OTP
export const FormItemInputOTP = createFormItem<
  Record<string, unknown>,
  GetProps<typeof Input.OTP>
>(Input.OTP, { span: 24 });

// FORM ITEM INPUT RADIO
export const FormItemRadioGroup = createFormItem<
  Record<string, unknown>,
  GetProps<typeof Radio.Group>
>(Radio.Group, { span: 24 });

// FORM ITEM SELECT
export const FormItemSelect = createFormItem<
  Record<string, unknown>,
  GetProps<typeof Select>
>(
  (props) => (
    <Select
      allowClear
      showSearch
      style={{ width: "100%" }}
      optionFilterProp="children"
      filterOption={(input, option) =>
        ((option?.label ?? "") as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      {...props}
    />
  ),
  { span: 24 }
);

// FORM ITEM DATE PICKER
export const FormItemDatePicker = createFormItem<
  Record<string, unknown>,
  GetProps<typeof DatePicker>
>((props) => <DatePicker allowClear style={{ width: "100%" }} {...props} />, {
  span: 24,
});

// FORM ITEM DATE PICKER RANGE
export const FormItemDatePickerRange = createFormItem<
  Record<string, unknown>,
  GetProps<typeof DatePicker.RangePicker>
>(
  (props) => (
    <DatePicker.RangePicker allowClear style={{ width: "100%" }} {...props} />
  ),
  { span: 24 }
);
