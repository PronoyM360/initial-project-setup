import { Card, Flex, Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../Antd/BreadCrumb';
import CommonButton from '../Antd/Button/CommonButton';

interface Props {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
}

const SingleContainer: React.FC<Props> = ({
  children,
  title,
  extra,
  loading,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Flex align='center' justify='space-between' wrap>
          <CommonButton
            name='PREVIOUS PAGE'
            type='link'
            danger
            icon='weui:previous-filled'
            onClick={() => navigate(-1)}
          />
          <BreadCrumb />
        </Flex>

        <Card
          loading={loading}
          bordered={false}
          title={
            <Typography.Text strong style={{ fontSize: '1rem' }}>
              {title}
            </Typography.Text>
          }
          extra={extra}
          children={children}
          style={{ background: 'transparent', boxShadow: 'none' }}
        />
      </Space>
    </>
  );
};

export default SingleContainer;
