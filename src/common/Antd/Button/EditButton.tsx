import { Button, type ButtonProps } from 'antd';
import React from 'react';
import Iconify from '../../../config/IconifyConfig';

const EditButton: React.FC<ButtonProps & { buttonLabel?: string }> = ({
  buttonLabel = 'Modify Details',
  ...rest
}) => {
  return (
    <Button
      {...rest}
      key='edit'
      type='link'
      size='small'
      icon={<Iconify icon='ic:outline-edit' />}
    >
      {buttonLabel}
    </Button>
  );
};

export default EditButton;
