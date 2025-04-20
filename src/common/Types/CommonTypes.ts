/* eslint-disable @typescript-eslint/no-explicit-any */

export interface A4PageContainerProps {
  children: React.ReactNode;
  documentTitle?: string;
  options?: {
    printHeader?: boolean;
    landscape?: boolean;
  };
  onComplete?: () => void;
}

export interface ColumnType {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (text: any, record: any) => React.ReactNode;
}

export interface TablePDFContainerProps {
  data: any[];
  columns: ColumnType[];
  documentTitle?: string;
  onComplete?: () => void;
  options?: {
    landscape?: boolean;
    fontSize?: number;
    headerColor?: string;
    alternateRowColor?: boolean;
  };
  onUpdate?: (record: any) => void;
  onDelete?: (id: string) => void;
}

export interface IFilterParams {
  examType?: string;
  dateRange?: [string, string] | null;
}

export type IFilterDataTypes = Partial<{
  status: string;
  from_date: string;
  to_date: string;
}>;
