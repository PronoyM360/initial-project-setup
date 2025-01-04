import React from 'react';
import { Tag as AntdTag, TagProps } from 'antd';

interface Props extends TagProps {
  name: string;
}

const Tag: React.FC<Props> = ({ name, ...rest }) => {
  return (
    <AntdTag bordered={false} {...rest}>
      {name.toUpperCase()}
    </AntdTag>
  );
};

export default Tag;
