import { Image, Space, Typography } from 'antd';
import React from 'react';
import { image_host_url, no_image } from '../../utilities/images';
import useBreakpoint from '../../hooks/useBreakpoint';

interface Props {
  image?: string;
  name?: string;
}

const AvatarWithLabel: React.FC<Props> = ({ image, name }) => {
  const { lg } = useBreakpoint();

  return (
    <Space direction={lg ? 'horizontal' : 'vertical'}>
      <Image
        width={lg ? 30 : 20}
        height={lg ? 30 : 20}
        src={image ? image_host_url.concat(image) : no_image}
        style={{ borderRadius: '50%', objectFit: 'cover' }}
        alt='avatar'
      />
      <Typography.Text
        style={{
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {name}
      </Typography.Text>
    </Space>
  );
};

export default AvatarWithLabel;
