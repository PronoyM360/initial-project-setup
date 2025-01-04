import { Button, ButtonProps } from 'antd';
import React from 'react';
import Iconify from '../../../config/IconifyConfig';

interface Props extends ButtonProps {
  name?: string;
  icon?: string;
  type?: 'link' | 'text' | 'default' | 'primary' | 'dashed';
}

const CommonButton: React.FC<Props> = ({
  name,
  icon,
  type = 'primary',
  ...rest
}) => {
  return (
    <Button {...rest} type={type} icon={icon && <Iconify icon={icon} />}>
      {name}
    </Button>
  );
};

export default CommonButton;
