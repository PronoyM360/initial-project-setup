import React from 'react';
import { Select as AntSelect, Space, Typography, type SelectProps } from 'antd';

interface OptionType {
  label: React.ReactNode;
  value: string | number | undefined;
}

interface Props<T extends OptionType> extends SelectProps {
  placeholder?: string | undefined;
  options: T[];
  width?: number | string;
  showSearch?: boolean;
}

const Select = <T extends OptionType>({
  placeholder = 'Select One',
  options,
  width = 180,
  showSearch = true,
  ...restProps
}: Props<T>) => {
  return (
    <AntSelect
      showSearch={showSearch}
      allowClear
      style={{ minWidth: width }}
      placeholder={placeholder}
      optionFilterProp='children'
      filterOption={(input, option) => {
        const labelValue = option?.label;
        if (typeof labelValue === 'string') {
          return labelValue.toLowerCase().includes(input.toLowerCase());
        }
        if (React.isValidElement(labelValue)) {
          const innerText = labelValue.props.name?.toLowerCase();
          return innerText?.includes(input.toLowerCase());
        }
        return false;
      }}
      options={options}
      {...restProps}
    />
  );
};

export default Select;

export const OptionLabel: React.FC<{
  name: string | number;
  extra: string | number;
}> = ({ name, extra }) => (
  <Space title={`${name} ${extra}`}>
    <Typography.Text>{name}</Typography.Text>
    <Typography.Text type='secondary' style={{ fontSize: '12px' }}>
      {extra}
    </Typography.Text>
  </Space>
);
