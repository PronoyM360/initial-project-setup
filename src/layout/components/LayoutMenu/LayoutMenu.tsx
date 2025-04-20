import { Menu } from "antd";
import React from "react";
import TopSection from "./TopSection";
import BottomSection from "./BottomSection";
import { useLocation } from "react-router-dom";
import { getOpenKeys } from "../../utilities/helper";
import { useNavigationMenu } from "../../utilities/navigationMenu";
import { useAppDispatch } from "../../../app/store";
import { resetFilter } from "../../../app/slice/filterSlice";

interface Props {
  collapsed: boolean;
}

const LayoutMenu: React.FC<Props> = ({ collapsed }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { menuItems, navigationMenu } = useNavigationMenu();

  const defaultOpenKeys = getOpenKeys(navigationMenu, location.pathname);

  return (
    <section
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <TopSection collapsed={collapsed} />
        <Menu
          mode="inline"
          onClick={() => dispatch(resetFilter())}
          items={menuItems}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={defaultOpenKeys}
        />
      </div>
      <BottomSection collapsed={collapsed} />
    </section>
  );
};

export default LayoutMenu;
