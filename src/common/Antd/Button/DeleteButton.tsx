import { Button, type ButtonProps } from 'antd';
import React from 'react';
import Iconify from '../../../config/IconifyConfig';

const DeleteButton: React.FC<ButtonProps & { buttonLabel?: string }> = ({
  buttonLabel = 'Delete Record',
  ...rest
}) => {
  return (
    <Button
      {...rest}
      key='delete'
      type='link'
      size='small'
      icon={<Iconify icon='mage:trash' />}
      danger
    >
      {buttonLabel}
    </Button>
  );
};

export default DeleteButton;
