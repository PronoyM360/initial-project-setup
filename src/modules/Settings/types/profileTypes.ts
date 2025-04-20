export interface ProfileTypes {
  id: number;
  username: string;
  name: string;
  email: string;
  phone_number: string;
  photo: string;
  created_at: Date;
  status: boolean;
  created_by: string;
  is_main_user: number;
  is_deleted: boolean;
  role: string;
  permissions: Permission[];
}

export interface Permission {
  permission_id: number;
  permission_name: string;
  read: number;
  write: number;
  update: number;
  delete: number;
}

export type ChangePasswordTypes = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};
