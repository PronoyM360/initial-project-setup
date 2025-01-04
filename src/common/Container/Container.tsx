import {
  Button,
  Col,
  Dropdown,
  Flex,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  addFilter,
  addRestFilter,
  resetFilter,
} from "../../app/slice/filterSlice";
import { ModalTypes, showModal } from "../../app/slice/modalSlice";
import { useAppDispatch } from "../../app/store";
import Iconify from "../../config/IconifyConfig";
import useBreakpoint from "../../hooks/useBreakpoint";
import BreadCrumb from "../Antd/BreadCrumb";
import { DrawerTypes, showDrawer } from "../../app/slice/drawerSlice";
import { SearchOutlined } from "@ant-design/icons";
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
}

const Container: React.FC<Props> = ({
  title,
  content,
  openModal,
  openDrawer,
  buttonLabel = "Create",
  options = {},
  additionalContent,
  filterData,
  buttonLink,
  additionalButton,
}) => {
  const { lg } = useBreakpoint();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const activeOptions = {
    showButton: options.showButton ?? true,
    showSearch: options.showSearch ?? true,
    placeholder: options.placeholder ?? "Search",
    showFilter: options.showFilter ?? true,
  };

  const items = additionalContent?.map((item, index) => ({
    key: String(index),
    label: item,
  }));

  const searchDebounce = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(addFilter({ name: "KEY", value: value || undefined }));
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
            {additionalButton}
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
                <Dropdown
                  open={open}
                  trigger={["click"]}
                  menu={{
                    items: [
                      ...(items || []),
                      {
                        type: "divider",
                      },
                      {
                        label: (
                          <Button
                            icon={<Iconify icon="mynaui:filter" />}
                            size="small"
                            block
                            type="link"
                          >
                            Filter Now
                          </Button>
                        ),
                        key: "submit",
                        onClick: () => {
                          if (filterData) {
                            Object.keys(filterData).forEach((key) => {
                              dispatch(
                                addRestFilter({
                                  label: key,
                                  value: filterData[key],
                                })
                              );
                            });
                          }
                        },
                      },
                    ],
                  }}
                  placement="bottomRight"
                  arrow
                  onOpenChange={() => setOpen(!open)}
                >
                  <Button
                    type={open ? "primary" : "default"}
                    icon={
                      <>
                        <Iconify
                          icon={
                            open
                              ? "mingcute:filter-fill"
                              : "mingcute:filter-line"
                          }
                        />
                      </>
                    }
                  >
                    Filter By
                  </Button>
                </Dropdown>
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
