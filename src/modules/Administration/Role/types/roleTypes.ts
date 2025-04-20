export type IPermission = {
  permission_id: number;
  read: number;
  write: number;
  update: number;
  delete: number;
};

export type ICreateRoleTypes = {
  role_name: string;
  permissions: IPermission[];
};

export interface IUpdateRoleTypes {
  id?: string | number;
  role_name: string;
  status: number;
  add_permissions: IPermission[];
}

export interface IRoleDetails {
  role_id: string;
  role_name: string;
  status?: number;
  is_main_role?: number;
  created_by: string;
  create_date: string;
  permissions?: IPermission[];
}

export interface IPermissionListTypes {
    permission_id: number;
    permission_name: string;
    read: number;
    write: number;  
    update: number;
    delete: number;
  }


export interface IRoleSingleDetails {
    role_id: string;
    role_name: string;
    status: number;
    is_main_role: number
    permissions: IPermissionListTypes[];
  }

export interface Permission {
  permission_id: number;
  permission_name: string;
}

export interface PermissionState {
  read: number;
  write: number;
  update: number;
  delete: number;
}

export interface PermissionsState {
  [key: number]: PermissionState;
}

export interface FormValues {
  role_name: string;
}
