import { Spin } from "antd";
import React from "react";

const Loader: React.FC = () => {
  return (
    <React.Fragment>
      <div
        style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}
      >
        <Spin size="large" />
      </div>
    </React.Fragment>
  );
};

export default Loader;
