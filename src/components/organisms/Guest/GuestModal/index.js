import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Grid } from "semantic-ui-react";
import ModalModule from "../../../atoms/ModalModule";
import Fieldset from "../../../atoms/Fieldset";
import { formatDateTime, formatDate } from "../../../../commons/utils";

import {
  doSave,
  closeModal,
  setApplyStatus,
  setCodeStatus
} from "../../../../redux/reducers/guestReducer";

const listApplyStatus = [
  { key: "ALL", label: "Áp dụng cho tất cả sản phẩm" },
  { key: "CUSTOM", label: "Chọn sản phẩm áp dụng" }
];
const Render = ({
  guest: {
    guestId,
    name,
    phone,
    address,
    email,
    type,
    token,
    gender,
    dateOfBirth,
    createDate,
    status
  },
  applyStatus,
  openModal,
  loading,
  checkAllItem,
  codeStatus,
  formLoading,
  modalFormSuccessMessage,
  onPositive,
  onClose,
  errors = {},
  dataSources,
  ...rest
}) => {
  return (
    <ModalModule
      size="small"
      title="Chi tiết khách hàng"
      open={openModal}
      onClose={onClose}
      onPositive={onPositive}
      justClose={true}
      {...rest}
    >
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width={7}>
            <Fieldset title="Họ Và Tên">{name}</Fieldset>
          </Grid.Column>
          <Grid.Column width={3}>
            <Fieldset title="Giới Tính">{gender}</Fieldset>
          </Grid.Column>
          <Grid.Column width={6}>
            <Fieldset title="SĐT">{phone}</Fieldset>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Fieldset title="Ngày Sinh">{formatDate(dateOfBirth)}</Fieldset>
          </Grid.Column>
          <Grid.Column width={8}>
            <Fieldset title="Ngày Tạo">{formatDateTime(createDate)}</Fieldset>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Fieldset title="Địa Chỉ">{address}</Fieldset>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Fieldset title="Email">{email}</Fieldset>
          </Grid.Column>
          <Grid.Column width={4}>
            <Fieldset title="Loại">{type}</Fieldset>
          </Grid.Column>
          <Grid.Column width={4}>
            <Fieldset title="Trạng Thái">{status}</Fieldset>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ModalModule>
  );
};

const SaleManagementModal = ({ onPositive, ...rest }) => {
  const selector = useSelector(
    ({
      guestReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        guest,
        listItems,
        // loading,
        selectBox,
        errors
      }
    }) => ({
      openModal,
      formLoading,
      modalFormSuccessMessage,
      guest,
      listItems,
      // loading,
      selectBox,
      errors
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const renderProps = {
    ...rest,
    ...selector,
    onClose: _ => dispatch(closeModal())
  };
  console.log(renderProps);
  return <Render {...renderProps} />;
};

export default SaleManagementModal;
