import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Form, Label } from "semantic-ui-react";
import FormInput from "../../../atoms/FormInput";
import ModalModule from "../../../atoms/ModalModule";
import DatePickerModule from "../../../atoms/DatePickerModule";

import {
  SaleTable,
  TableRow,
  TableCell,
  TableHeaderCell,
  calcCellWidth
} from "../../../atoms/SaleTable";

import { DEFAULT_STATUS } from "../../../../constants/entites";

import {
  doSave,
  closeModal
} from "../../../../redux/reducers/saleManagementReducer";

const Render = ({
  sale: {
    saleId,
    name,
    codeStatus,
    codeDetails,
    percent,
    startDate,
    endDate,
    applyAll,
    selectedItem
  },
  openModal,
  formLoading,
  modalFormSuccessMessage,
  onPositive,
  onClose,
  onChangeName,
  onChangeStatusCode,
  onChangeStatus,
  onChangeSlugValue,
  errors = {},
  dataSources,
  ...rest
}) => {
  const cellWidth = calcCellWidth([100], true);

  const TableHeader = () => (
    <>
      <TableHeaderCell width={cellWidth[0]}>Tên Sản Phẩm</TableHeaderCell>
    </>
  );
  return (
    <ModalModule
      size="small"
      title={saleId ? "Update" : "Create"}
      open={openModal}
      onClose={onClose}
      onPositive={onPositive}
      {...rest}
    >
      <Form>
        <FormInput
          label="Tên chương trình: "
          placeholder="Nhập tên chương trình"
          onChange={onChangeName}
        />
        <Form.Group>
          <Form.Field width={12}>
            <FormInput
              label="Mã giảm giá: "
              placeholder="Nhập mã giảm giá"
              style={{ paddingBottom: "10px" }}
              disabled={codeStatus ? "true" : "false"}
            />
            <Form.Group inline={true}>
              <Form.Checkbox
                label="Dùng mã giảm giá"
                checked={codeStatus}
                onChange={onChangeStatusCode}
              />
              <Form.Button
                icon
                size="mini"
                disabled={codeStatus ? "true" : "false"}
              >
                Ngẫu nhiên
              </Form.Button>
            </Form.Group>
          </Form.Field>
          <FormInput
            type="number"
            min="1"
            max="100"
            label="Phần trăm: "
            placeholder="%"
            width={4}
          />
        </Form.Group>
        <Form.Group widths={2}>
          <DatePickerModule label="Thời điểm bắt đầu: " />
          <DatePickerModule label="Thời điểm kết thúc: " />
        </Form.Group>
        <Form.Group>
          <Form.Radio label="Áp dụng cho tất cả sản phẩm" value="all" />
          <Form.Radio label="Chọn sản phẩm áp dụng" value="single" />
        </Form.Group>
        <Form.Group widths={3}>
          <Form.Select label="Theo danh mục" />
          <Form.Select label="Theo nhóm loại sản phẩm" />
          <Form.Select label="Theo loại sản phẩm" />
        </Form.Group>
      </Form>
      <SaleTable
        loading={false}
        showCheckbox
        header={<TableHeader />}
        currentItems={dataSources.length}
        emptyColSpan={3}
        counter={selectedItem.length}
        style={{ height: "200px" }}
      >
        {dataSources.map((item, index) => (
          <TableRow key={index} showCheckbox checked={item.checked}>
            <TableCell width={cellWidth[0]}>{item.name}</TableCell>
          </TableRow>
        ))}
      </SaleTable>
    </ModalModule>
  );
};

const SaleManagementModal = ({ onPositive, ...rest }) => {
  const selector = useSelector(
    ({
      saleManagementReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        sale,
        errors
      }
    }) => ({
      openModal,
      formLoading,
      modalFormSuccessMessage,
      sale,
      errors
    }),
    shallowEqual
  );

  const [sale, setSale] = useState({
    name: "",
    codeStatus: false,
    codeDetails: "",
    percent: 0,
    startDate: new Date(),
    endDate: new Date(),
    applyAll: false,
    selectedItem: [],
    dataSources: [
      {
        brand_id: 10,
        name: "Samsung",
        slugName: "/samsung",
        email: "sjhdj@gmail.com",
        status: "ACTIVE"
      },
      {
        brand_id: 10,
        name: "Samsung",
        slugName: "/samsung",
        email: "sjhdj@gmail.com",
        status: "ACTIVE"
      },
      {
        brand_id: 10,
        name: "Samsung",
        slugName: "/samsung",
        email: "sjhdj@gmail.com",
        status: "ACTIVE"
      },
      {
        brand_id: 10,
        name: "Samsung",
        slugName: "/samsung",
        email: "sjhdj@gmail.com",
        status: "ACTIVE"
      },
      {
        brand_id: 10,
        name: "Samsung",
        slugName: "/samsung",
        email: "sjhdj@gmail.com",
        status: "ACTIVE"
      },
      {
        brand_id: 10,
        name: "Samsung",
        slugName: "/samsung",
        email: "sjhdj@gmail.com",
        status: "ACTIVE"
      }
    ]
  });

  const dispatch = useDispatch();

  useEffect( () => {
    console.log("aaa")
  })

  const renderProps = {
    ...rest,
    ...selector,
    ...sale,
    onChangeName: (_, input) =>
      setSale({
        ...sale,
        name: input.value
      }),

    onChangeStatusCode: (_, checkbox) =>
      setSale({
        ...sale,
        codeStatus: checkbox.checked,
      }),
    onChangeImage: images =>
      setSale({
        ...sale,
        image: images
      }),
    onChangeStatus: (_, checkbox) =>
      setSale({
        ...sale,
      }),
    // onPositive: _ => dispatch(doSave(sale)),
    onClose: _ => dispatch(closeModal())
  };
  console.log(sale);
  return <Render {...renderProps} />;
};

export default SaleManagementModal;
