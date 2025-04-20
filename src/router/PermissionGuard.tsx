import { Spin } from "antd";
import React, { useMemo } from "react";
import { useGetProfileQuery } from "../modules/Settings/api/profileEndpoint";
import AccessDenied from "../common/AccessDenied/AccessDenied";
import { ModuleNameType } from "../hooks/usePermissionChecked";

interface Props {
  name?: ModuleNameType;
  children: React.ReactNode;
}

const PermissionGuard: React.FC<Props> = ({ name, children }) => {
  const { data, isLoading } = useGetProfileQuery();

  const hasPermission = useMemo(() => {
    if (name === "Dashboard") return true;

    return data?.data?.permissions?.some(
      ({ permission_name }) => permission_name === name
    );
  }, [data, name]);

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (hasPermission) {
    return <>{children}</>;
  }

  return <AccessDenied />;
};

export default PermissionGuard;
