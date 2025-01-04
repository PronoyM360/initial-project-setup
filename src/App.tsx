import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider, FloatButton, App as AntdContainer, theme } from "antd";
import NotificationConfig from "./config/NotificationConfig";
import ModalConfig from "./config/ModalConfig";
import DrawerConfig from "./config/DrawerConfig";
import { useAppSelector } from "./app/store";
import { ThemeState } from "./app/slice/themeSlice";
import useBreakpoint from "./hooks/useBreakpoint";
import { hexToRgba } from "./utilities/helper";
import router from "./router/router";

const App: React.FC = () => {
  const {
    mode,
    colorPrimary,
    fontFamily,
    fontSize,
    siderBg,
    itemBg,
    headerBg,
    colorText,
    subMenuItemBg,
    itemHoverBg,
    itemSelectedColor,
  } = useAppSelector(ThemeState);
  const { xs } = useBreakpoint();

  const isLight: boolean = mode === "light" ? true : false;

  const getAlgorithm = () => {
    if (xs) {
      return [
        isLight ? theme.defaultAlgorithm : theme.darkAlgorithm,
        theme.compactAlgorithm,
      ];
    }
    return isLight ? theme.defaultAlgorithm : theme.darkAlgorithm;
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: getAlgorithm(),
        token: {
          colorPrimary,
          fontFamily,
          fontSize,
        },
        components: {
          Layout: {
            siderBg,
            headerBg,
            algorithm: true,
          },
          Menu: {
            itemBg,
            subMenuItemBg,
            itemHoverBg,
            colorText,
            itemSelectedBg: hexToRgba(colorPrimary, 1),
            itemSelectedColor,
            algorithm: true,
          },
          Table: {
            headerBg: hexToRgba(colorPrimary, 0.3),
            algorithm: true,
          },
        },
      }}
    >
      <AntdContainer>
        <RouterProvider router={router} />
        <NotificationConfig />
        <ModalConfig />
        <DrawerConfig />
        <FloatButton.BackTop />
      </AntdContainer>
    </ConfigProvider>
  );
};

export default App;
