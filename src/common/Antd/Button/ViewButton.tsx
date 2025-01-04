import { Button, type ButtonProps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Iconify from '../../../config/IconifyConfig';

interface Props extends ButtonProps {
  pathname: string;
  name?: string;
  icon?: string;
}

const ViewButton: React.FC<Props> = ({
  pathname,
  name = 'View Details',
  icon = 'lucide:view',
  ...rest
}) => {
  return (
    <Link state={location.pathname} to={pathname}>
      <Button
        {...rest}
        key='view'
        type='link'
        size='small'
        icon={<Iconify icon={icon} />}
      >
        {name}
      </Button>
    </Link>
  );
};

export default ViewButton;
