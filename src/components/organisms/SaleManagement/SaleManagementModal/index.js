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
import {
  setApplyStatus,
  setCodeStatus
} from "../../../../redux/reducers/saleManagementReducer";

const listApplyStatus = [
  { key: "ALL", label: "Áp dụng cho tất cả sản phẩm" },
  { key: "CUSTOM", label: "Chọn sản phẩm áp dụng" }
];
const Render = ({
  sale: { saleId, name, code, percent, startDate, endDate, selectedItem },
  applyStatus,
  openModal,
  codeStatus,
  formLoading,
  modalFormSuccessMessage,
  onPositive,
  onClose,
  onChangeName,
  onChangeStatusCode,
  onChangeCode,
  onChangeApplyStatus,
  onChangeStartDate,
  onChangeEndDate,
  onChangePercent,
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
              disabled={codeStatus ? false : true}
              onChange={onChangeCode}
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
                disabled={codeStatus ? false : true}
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
            onChange={onChangePercent}
          />
        </Form.Group>
        <Form.Group widths={2}>
          <DatePickerModule
            label="Thời điểm bắt đầu: "
            onChange={onChangeStartDate}
            onSelected={onChangeStartDate}
            value={startDate}
          />
          <DatePickerModule
            label="Thời điểm kết thúc: "
            onChange={onChangeEndDate}
            onSelected={onChangeEndDate}
            value={endDate}
          />
        </Form.Group>
        <Form.Group>
          {listApplyStatus.map(item => (
            <Form.Radio
              key={item.key}
              label={item.label}
              value={item.key}
              checked={applyStatus === item.key}
              onChange={onChangeApplyStatus}
            />
          ))}
        </Form.Group>
        {applyStatus === "CUSTOM" ? (
          <div>
            <Form.Group widths={3}>
              <Form.Select label="Theo danh mục" />
              <Form.Select label="Theo nhóm loại sản phẩm" />
              <Form.Select label="Theo loại sản phẩm" />
            </Form.Group>
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
          </div>
        ) : (
          ""
        )}
      </Form>
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
        // sale,
        dataSources,
        applyStatus,
        codeStatus,
        errors
      }
    }) => ({
      openModal,
      formLoading,
      modalFormSuccessMessage,
      // sale,
      dataSources,
      applyStatus,
      codeStatus,
      errors
    }),
    shallowEqual
  );

  const [sale, setSale] = useState({
    name: "",
    code: "",
    percent: 0,
    startDate: new Date(),
    endDate: new Date("2020/02/20"),
    selectedItem: []
  });

  const dispatch = useDispatch();

  const renderProps = {
    ...rest,
    ...selector,
    sale,
    onChangeName: (_, input) =>
      setSale({
        ...sale,
        name: input.value
      }),

    onChangeStatusCode: (_, checkbox) =>
      dispatch(setCodeStatus(checkbox.checked)),

    onChangeCode: (_, input) =>
      setSale({
        ...sale,
        code: input.value
      }),

    onChangePercent: (_, input) =>
      setSale({
        ...sale,
        percent: input.value
      }),

    onChangeStartDate: date => {
      setSale({
        ...sale,
        startDate: date
      });
    },

    onChangeEndDate: date => {
      setSale({
        ...sale,
        endDate: date
      });
    },

    onChangeApplyStatus: (_, radio) => dispatch(setApplyStatus(radio.value)),

    onChangeImage: images =>
      setSale({
        ...sale,
        image: images
      }),

    onChangeStatus: (_, checkbox) =>
      setSale({
        ...sale
      }),
    onPositive: _ => dispatch(doSave(sale)),
    onClose: _ => dispatch(closeModal())
  };
  console.log(renderProps);
  return <Render {...renderProps} />;
};

export default SaleManagementModal;
