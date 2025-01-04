import { Button, ButtonProps } from 'antd';
import React from 'react';
import Iconify from '../../../config/IconifyConfig';

const PrintButton: React.FC<ButtonProps> = ({ ...rest }) => {
  return (
    <Button
      {...rest}
      key='print'
      type='primary'
      icon={<Iconify icon='material-symbols:print' />}
    >
      Print
    </Button>
  );
};

export default PrintButton;
