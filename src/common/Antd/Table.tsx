import {
  Table as AntTable,
  Button,
  Dropdown,
  TableColumnType,
  Typography,
  type TableProps,
} from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/store';
import React from 'react';
import Iconify from '../../config/IconifyConfig';
import { addFilter, FilterState } from '../../app/slice/filterSlice';

interface Props<T> extends TableProps<T> {
  rowKey: keyof T | ((record: T) => React.Key);
  total: number | undefined;
  refetch: () => void;
  columns: Array<TableColumnType<T>>;
}

const Table = <T extends object>({
  rowKey,
  total,
  refetch,
  columns,
  ...rest
}: Props<T>) => {
  const { limit, skip } = useAppSelector(FilterState);
  const dispatch = useAppDispatch();
  const showPagination: boolean = total !== undefined && total >= limit;

  return (
    <AntTable
      title={() => (
        <Button
          title='Refetch'
          type='link'
          size='small'
          icon={<Iconify icon='mage:reload' />}
          onClick={() => refetch()}
        />
      )}
      {...rest}
      bordered
      rowKey={rowKey}
      size='small'
      scroll={{ x: true, y: Number(total) * 13 >= 650 ? 650 : undefined }}
      columns={[
        {
          title: 'SL',
          width: 60,
          render: (_: unknown, __: unknown, index: number) => skip + index + 1,
        },
        ...columns,
      ]}
      pagination={
        showPagination
          ? {
              total: total,
              showSizeChanger: true,
              showTotal: (total) => (
                <Typography.Text strong>
                  Total {limit} of {total}
                </Typography.Text>
              ),
              current: Math.floor(skip / limit) + 1,
              pageSize: limit,
              onChange: (page: number, pageSize: number) => {
                dispatch(addFilter({ value: pageSize, name: 'LIMIT' }));
                dispatch(
                  addFilter({ value: (page - 1) * pageSize, name: 'SKIP' })
                );
              },
            }
          : false
      }
      footer={
        showPagination
          ? undefined
          : () => <Typography.Text>Total Data: {total || 0}</Typography.Text>
      }
    />
  );
};

export default Table;

// TABLE COLUMN ACTION DROPDOWN
export const TableActionDropdown = <T,>({
  title = 'Actions',
  content,
}: {
  title?: string;
  content: (record: T) => React.ReactElement[];
}) => ({
  title,
  render: (_: unknown, record: T) => {
    const items = content(record).map((item, index) => ({
      key: String(index),
      label: item,
    }));
    return (
      <Dropdown
        placement='bottomRight'
        trigger={['click']}
        arrow
        menu={{ items }}
      >
        <Button
          type='text'
          size='small'
          icon={<Iconify icon='entypo:dots-three-horizontal' />}
        />
      </Dropdown>
    );
  },
});
