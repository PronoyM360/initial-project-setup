import React from "react";
import CustomizeTheme from "../components/CustomizeTheme";
import { Divider } from "antd";
import CustomizePrimaryColor from "../components/CustomizePrimaryColor";
import CustomizeFontSizeAndFontFamily from "../components/CustomizeFontSizeAndFontFamily";

const Themes = () => {
  return (
    <div>
      <React.Fragment>
        <CustomizeTheme />
        <Divider />
        <CustomizePrimaryColor />
        <Divider />
        <CustomizeFontSizeAndFontFamily />
      </React.Fragment>
    </div>
  );
};

export default Themes;
