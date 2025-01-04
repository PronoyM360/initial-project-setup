import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import Iconify from "../../config/IconifyConfig";

export type NavigationItem = {
  key: string;
  label: string;
  to?: string;
  icon: string;
  children?: NavigationItem[];
};

const icons = { create: "pajamas:todo-add", list: "typcn:th-list" };

export const navigationMenu: NavigationItem[] = [
  {
    key: "/",
    to: "/",
    label: "Dashboard",
    icon: "streamline:dashboard-circle-solid",
  },
  {
    key: "/payments",
    to: "/payments",
    label: "Payments",
    icon: "mdi:instant-deposit",
    children: [
      {
        key: "/payments/deposit-request-list",
        to: "/payments/deposit-request-list",
        label: "Deposit Request List",
        icon: icons.list,
      },
      {
        key: "/payments/agency-transaction",
        to: "/payments/agency-transaction",
        label: "Agency Transaction",
        icon: icons.list,
      },
    ],
  },

  {
    key: "/teachers",
    to: "/teachers",
    label: "Teachers",
    icon: "material-symbols:support",
  },
  {
    key: "/configuration",
    to: "/configuration",
    label: "Configuration",
    icon: "hugeicons:configuration-01",
    children: [
      {
        key: "/configuration/hotel-commission",
        to: "/configuration/hotel-commission",
        label: "Hotel Markup",
        icon: icons.list,
      },
    ],
  },
  {
    key: "/administration",
    to: "/administration",
    label: "Administration",
    icon: "eos-icons:admin",
    children: [
      {
        key: "/administration/users",
        to: "/administration/users",
        label: "Users",
        icon: icons.list,
      },
      {
        key: "/administration/roles",
        to: "/administration/roles",
        label: "Roles",
        icon: icons.list,
      },
      {
        key: "/administration/hidden-commission",
        to: "/administration/hidden-commission",
        label: "Hidden Markup",
        icon: icons.list,
      },
    ],
  },
];

export const renderMenuItem = (
  item: NavigationItem
): Required<MenuProps>["items"][number] => ({
  key: item.key,
  label: item.children ? (
    item.label
  ) : (
    <NavLink
      style={({ isActive }) => {
        return {
          fontWeight: isActive ? 600 : "normal",
        };
      }}
      to={String(item.to)}
    >
      {item.label}
    </NavLink>
  ),
  icon: <Iconify icon={item.icon} />,
  ...(item.children && { children: item.children.map(renderMenuItem) }),
  type: "item",
});
