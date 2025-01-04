import React from "react";
import { Modal, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../app/store";
import { closeModal, ModalState } from "../app/slice/modalSlice";

const ModalConfig: React.FC = () => {
  const { open, title, content, width } = useAppSelector(ModalState);
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    dispatch(closeModal());
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      onOk={handleClose}
      width={width}
      footer={null}
      title={
        <Typography.Paragraph strong style={{ fontSize: "1rem" }}>
          {title || "Information"}
        </Typography.Paragraph>
      }
      children={content || <>No content available</>}
    />
  );
};

export default ModalConfig;
