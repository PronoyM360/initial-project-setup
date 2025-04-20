/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import Iconify from "../../config/IconifyConfig";
import { ModuleNameType } from "../../hooks/usePermissionChecked";
import { useGetProfileQuery } from "../../modules/Settings/api/profileEndpoint";

export type NavigationItem = {
  key: string;
  label: string;
  to?: string;
  icon: string;
  module?: ModuleNameType;
  children?: NavigationItem[];
};

const icons = { create: "pajamas:todo-add", list: "typcn:th-list" };

const hasPermissionForModule = (
  permissions: any[],
  moduleName?: ModuleNameType
) => {
  if (!moduleName || moduleName === "Dashboard") return true;
  return permissions?.some(
    ({ permission_name }) => permission_name === moduleName
  );
};

export const useNavigationMenu = () => {
  const { data } = useGetProfileQuery();
  const permissions = data?.data?.permissions || [];

  const navigationMenu: NavigationItem[] = [
    // Dashboard
    {
      key: "/",
      to: "/",
      label: "Dashboard",
      icon: "streamline:dashboard-circle-solid",
      module: "Dashboard",
    },
    // Teacher
    {
      key: "/teacher",
      to: "/teacher",
      label: "Teacher",
      icon: "fluent-emoji-high-contrast:woman-teacher",
      module: "Teacher",
    },
    // Administration
    {
      key: "/administration",
      to: "/administration",
      label: "Administration",
      icon: "material-symbols:admin-panel-settings-rounded",
      module: "Administration",
      children: [
        {
          key: "/administration/admin",
          to: "/administration/admin",
          label: "Admin",
          icon: icons.list,
        },
        {
          key: "/administration/role",
          to: "/administration/role",
          label: "Role",
          icon: icons.list,
        },
      ],
    },
  ];

  // Filter navigation items based on permissions
  const filterNavigationItems = (items: NavigationItem[]): NavigationItem[] => {
    return items
      .filter((item) => hasPermissionForModule(permissions, item.module))
      .map((item) => ({
        ...item,
        children: item.children
          ? filterNavigationItems(item.children)
          : undefined,
      }));
  };

  const filteredMenu = filterNavigationItems(navigationMenu);

  const renderMenuItem = (
    item: NavigationItem
  ): Required<MenuProps>["items"][number] => ({
    key: item.key,
    label: item.children ? (
      item.label
    ) : (
      <NavLink
        style={({ isActive }) => ({
          fontWeight: isActive ? 600 : "normal",
        })}
        to={String(item.to)}
      >
        {item.label}
      </NavLink>
    ),
    icon: <Iconify icon={item.icon} />,
    ...(item.children && { children: item.children.map(renderMenuItem) }),
    type: "item",
  });

  return {
    menuItems: filteredMenu.map(renderMenuItem),
    navigationMenu: filteredMenu,
  };
};
