import { ColorPicker, Flex, Space, Tooltip, Typography } from "antd";
import React from "react";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { themeCustomize, ThemeState } from "../../../app/slice/themeSlice";
import { primaryColors } from "../../../app/utilities/theme";
import CommonButton from "../../../common/Antd/Button/CommonButton";

const CustomizePrimaryColor: React.FC = () => {
  const { lg } = useBreakpoint();
  const { colorPrimary } = useAppSelector(ThemeState);
  const dispatch = useAppDispatch();

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography.Text strong style={{ fontSize: lg ? "1.5rem" : "1rem" }}>
        Customize Primary Color
      </Typography.Text>
      <Typography.Text type="secondary">
        Select a primary color that matches your personal style or brand
        preferences.
      </Typography.Text>
      <Flex align="center" wrap gap={5}>
        {primaryColors.map(({ label, value }, index) => (
          <Tooltip key={index} title={label} color={value}>
            <CommonButton
              onClick={() =>
                dispatch(themeCustomize({ type: "PRIMARY_COLOR", value }))
              }
              type="primary"
              style={{ background: value }}
              shape="circle"
              icon={value === colorPrimary ? "mingcute:check-2-line" : ""}
            />
          </Tooltip>
        ))}
        <ColorPicker
          mode="single"
          onChangeComplete={(value) =>
            dispatch(
              themeCustomize({
                type: "PRIMARY_COLOR",
                value: value.toHexString(),
              })
            )
          }
        />
      </Flex>
    </Space>
  );
};

export default CustomizePrimaryColor;
