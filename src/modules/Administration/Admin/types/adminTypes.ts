/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICreateAdminTypes {
  role_id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  phone_number?: string;
  photo?: string;
}

export interface IAdminListTypes {
  id: number;
  role_id: number;
  username: string;
  email: string;
  name: string;
  phone_number: string;
  photo: string;
  status: boolean;
  created_at: string; 
  role_name: string; 
}

export type IAdminDetailsTypes = {
  id: number | string;
  role_id: number;
  role_name: string;
  username: string;
  name: string;
  email: string;
  phone_number: string;
  photo: string;
  created_at: string; 
  status: boolean;
  created_by: number; 
  is_main_user: number; 
};


export interface IUpdateAdminTypes {
  id?: string | number;
  data?: FormData;
  username?: string;
  role_name?: string;
  name?: string;
  phone_number?: string;
  photo?: string;
  status?: boolean;
  role_id?: any;
}

export interface IUpdateAdminFormProps {
  record: IAdminDetailsTypes;
}
