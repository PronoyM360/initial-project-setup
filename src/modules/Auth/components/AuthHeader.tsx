import { Space, Typography } from "antd";
import React from "react";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { useTimer } from "../hooks/useTImer";

interface Props {
  title: string;
  description: string;
  timer?: boolean;
}

const AuthHeader: React.FC<Props> = ({ title, description, timer }) => {
  const { lg } = useBreakpoint();
  const { time, isWarning } = useTimer();

  return (
    <React.Fragment>
      <Space
        direction="vertical"
        align={lg ? "start" : "center"}
        style={{ width: "100%", marginBottom: lg ? "3rem" : "2rem" }}
      >
        <Typography.Title
          style={{
            display: "block",
            color: lg ? "inherit" : "white",
          }}
        >
          {title}
        </Typography.Title>
        <Typography.Text
          type="secondary"
          style={{
            display: "block",
            textAlign: lg ? "left" : "center",
            color: lg ? "#85898B" : "#cccccc",
          }}
        >
          {description}
        </Typography.Text>

        {timer && (
          <Typography.Title level={3} type={isWarning ? "danger" : "success"}>
            {time.minutes}:{time.seconds}
          </Typography.Title>
        )}
      </Space>
    </React.Fragment>
  );
};

export default AuthHeader;
