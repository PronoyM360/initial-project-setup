import { useGetProfileQuery } from "../modules/Settings/api/profileEndpoint";

export type ModuleNameType =
  | "Dashboard"
  | "Semester"
  | "Exam"
  | "Student"
  | "Teacher"
  | "Configuration"
  | "Report"
  | "Administration";

type PermissionStatus = {
  canRead: number;
  canWrite: number;
  canUpdate: number;
  canDelete: number;
};

export type PermissionObject = {
  module_id: number;
  module_name: string;
  read: number;
  write: number;
  update: number;
  delete: number;
};

const usePermissionCheck = (moduleName: ModuleNameType): PermissionStatus => {
  const { data } = useGetProfileQuery();

  const initialPermissions: PermissionStatus = {
    canRead: 0,
    canWrite: 0,
    canUpdate: 0,
    canDelete: 0,
  };

  const permissions = data?.data?.permissions?.find(
    ({ permission_name }) => permission_name === moduleName
  );

  if (permissions) {
    return {
      canRead: permissions.read || 0,
      canWrite: permissions.write || 0,
      canUpdate: permissions.update || 0,
      canDelete: permissions.delete || 0,
    };
  }

  return initialPermissions;
};

export default usePermissionCheck;
