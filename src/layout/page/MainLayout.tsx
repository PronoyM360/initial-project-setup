import { Layout } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import useBreakpoint from "../../hooks/useBreakpoint";
import LayoutDrawer from "../components/LayoutDrawer/LayoutDrawer";
import LayoutFooter from "../components/LayoutFooter/LayoutFooter";
import LayoutHeader from "../components/LayoutHeader/LayoutHeader";
import LayoutMenu from "../components/LayoutMenu/LayoutMenu";
import ResizableSidebar from "../utilities/ResizableSidebar";

const SIDEBAR_EXPANDED_WIDTH = 270;
const SIDEBAR_COLLAPSED_WIDTH = 80;

const MainLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [siderWidth, setSiderWidth] = useState(SIDEBAR_EXPANDED_WIDTH);
  const { xs, sm, md, lg, xl } = useBreakpoint();

  useEffect(() => {
    const determineCollapsedState = () => {
      if (lg && xl) return false;
      if (sm && md && !lg && !xl) return true;
      if (sm && md && lg) return false;
      if (sm) return true;
      if (xs) return true;
      return false;
    };

    setCollapsed(determineCollapsedState());
    setSiderWidth(
      determineCollapsedState()
        ? SIDEBAR_COLLAPSED_WIDTH
        : SIDEBAR_EXPANDED_WIDTH
    );
  }, [xs, sm, md, lg, xl]);

  const handleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      setSiderWidth(prev ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH);
      return !prev;
    });
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const marginLeft = useMemo(() => {
    if (lg && xl) return siderWidth;
    if (sm && md && !lg && !xl)
      return collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;
    if (sm && md && lg) return siderWidth;
    if (sm) return collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;
    if (xs) return 0;
    return 0;
  }, [collapsed, lg, md, siderWidth, sm, xl, xs]);

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Layout.Sider
        width={siderWidth}
        style={{
          position: "fixed",
          userSelect: "none",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: "auto",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "auto",
          scrollBehavior: "smooth",
          padding: "0 8px",
        }}
        breakpoint="lg"
        trigger={null}
        collapsedWidth={xs ? 0 : SIDEBAR_COLLAPSED_WIDTH}
        collapsible
        collapsed={collapsed}
      >
        <LayoutMenu collapsed={collapsed} />
        <LayoutDrawer
          collapsed
          open={open}
          setOpen={setOpen}
          siderWidth={SIDEBAR_EXPANDED_WIDTH}
        />
        {lg && !collapsed && (
          <ResizableSidebar
            onResize={(width: number) => setSiderWidth(width)}
          />
        )}
      </Layout.Sider>

      <Layout
        style={{
          marginLeft: marginLeft,
          transition: "margin-left 0.2s ease",
        }}
      >
        <LayoutHeader
          xs={xs}
          collapsed={collapsed}
          handleCollapsed={handleCollapsed}
          handleOpen={handleOpen}
        />

        <Layout.Content style={{ padding: "1.5em" }}>
          <Outlet />
        </Layout.Content>

        <LayoutFooter />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
