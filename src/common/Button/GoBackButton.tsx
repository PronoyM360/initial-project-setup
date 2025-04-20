import { Button } from "antd";
import React from "react";
import Iconify from "../../config/IconifyConfig";
import { NavigateFunction, useNavigate } from "react-router-dom";

const GoBackButton: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const handleGoBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Button
      icon={<Iconify icon="ic:twotone-arrow-back" />}
      size="small"
      shape="round"
      onClick={handleGoBack}
      type="link"
    >
      GO BACK
    </Button>
  );
};

export default GoBackButton;
