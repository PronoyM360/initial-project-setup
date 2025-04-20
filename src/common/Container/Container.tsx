import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Input, Row, Space, Typography } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DrawerTypes, showDrawer } from "../../app/slice/drawerSlice";
import { addFilter, resetFilter } from "../../app/slice/filterSlice";
import { ModalTypes, showModal } from "../../app/slice/modalSlice";
import { useAppDispatch } from "../../app/store";
import Iconify from "../../config/IconifyConfig";
import useBreakpoint from "../../hooks/useBreakpoint";
import BreadCrumb from "../Antd/BreadCrumb";
interface Props {
  title: string;
  content: React.ReactNode;
  buttonLabel?: string;
  openModal?: ModalTypes;
  openDrawer?: DrawerTypes;
  buttonLink?: string;
  options?: {
    showButton?: boolean;
    showSearch?: boolean;
    placeholder?: string;
    showFilter?: boolean;
  };
  additionalContent?: React.ReactNode[];
  additionalButton?: React.ReactNode;
  filterData?: {
    [key: string]: string | number | boolean;
  };
  resetButton?: boolean;
}

const Container: React.FC<Props> = ({
  title,
  content,
  openModal,
  openDrawer,
  buttonLabel = "Create",
  options = {},
  additionalContent,
  buttonLink,
  additionalButton,
  resetButton = true,
}) => {
  const { lg } = useBreakpoint();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const activeOptions = {
    showButton: options.showButton ?? true,
    showSearch: options.showSearch ?? true,
    placeholder: options.placeholder ?? "Search",
    showFilter: options.showFilter ?? true,
  };

  const searchDebounce = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(addFilter({ name: "KEY", value: value.trim() || undefined }));
      }, 500),
    [dispatch]
  );
  useEffect(() => {
    return () => {
      searchDebounce.cancel();
    };
  }, [searchDebounce]);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <BreadCrumb />
      <Typography.Text
        strong
        style={{
          fontSize: lg ? "1.5rem" : "1rem",
        }}
      >
        {title}
      </Typography.Text>
      <Row style={{ marginTop: "16px" }} gutter={[10, 10]}>
        <Col span={24} lg={6}>
          <Space>
            {activeOptions.showButton && (
              <Button
                onClick={() =>
                  buttonLink
                    ? navigate(buttonLink)
                    : dispatch(
                        openModal
                          ? showModal(openModal)
                          : showDrawer(openDrawer)
                      )
                }
                type="primary"
                icon={<Iconify icon="mdi:add-bold" />}
              >
                {buttonLabel}
              </Button>
            )}
            <div>{additionalButton}</div>
            {resetButton && (
              <Button
                title="Filter Reset"
                onClick={() => {
                  dispatch(resetFilter());
                  navigate(window.location.pathname, {
                    replace: true,
                    state: { reset: true },
                  });
                }}
                icon={<Iconify icon="carbon:reset" />}
              />
            )}
          </Space>
        </Col>
        <Col span={24} lg={18}>
          <Flex justify="flex-end" align="center" gap={8} wrap>
            {activeOptions.showSearch && (
              <Input
                style={{ width: "200px" }}
                allowClear
                defaultValue={searchParams.get("key") || undefined}
                maxLength={50}
                prefix={<SearchOutlined />}
                placeholder={activeOptions.placeholder}
                onChange={(value) => searchDebounce(value.target.value)}
              />
            )}
            {activeOptions.showFilter && (
              <>
                {additionalContent?.map((item, index) => (
                  <Flex key={index} wrap children={item} />
                ))}
                <Button type="link" icon={<Iconify icon="marketeq:filter" />} />
              </>
            )}
          </Flex>
        </Col>
      </Row>
      <>{content}</>
    </Space>
  );
};

export default Container;
