import { ColorPicker, Flex, Space, Tooltip, Typography } from "antd";
import React from "react";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { SideBarCustomize, ThemeState } from "../../../app/slice/themeSlice";
import { sidebarColors } from "../../../app/utilities/theme";
import CommonButton from "../../../common/Antd/Button/CommonButton";

const CustomizeSideBarColor: React.FC = () => {
  const { lg } = useBreakpoint();
  const { sidebarColor } = useAppSelector(ThemeState);
  const dispatch = useAppDispatch();

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography.Text strong style={{ fontSize: lg ? "1.5rem" : "1rem" }}>
        Customize SideBar Color
      </Typography.Text>
      <Typography.Text type="secondary">
        Select a sidebar color that matches your personal style or brand
        preferences.
      </Typography.Text>
      <Flex align="center" wrap gap={5}>
        {sidebarColors.map(({ label, value }, index) => (
          <Tooltip key={index} title={label} color={value}>
            <CommonButton
              onClick={() =>
                dispatch(SideBarCustomize({ type: "SIDEBAR_COLOR", value }))
              }
              type="primary"
              style={{ background: value }}
              shape="circle"
              icon={value === sidebarColor ? "mingcute:check-2-line" : ""}
            />
          </Tooltip>
        ))}
        <ColorPicker
          mode="single"
          disabledAlpha
          onChangeComplete={(value) =>
            dispatch(
              SideBarCustomize({
                type: "SIDEBAR_COLOR",
                value: value.toHexString(),
              })
            )
          }
        />
      </Flex>
    </Space>
  );
};

export default CustomizeSideBarColor;
