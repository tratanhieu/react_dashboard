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
  // onChangeName,
  // onChangeStatusCode,
  // onChangeCode,
  // onChangeApplyStatus,
  // onChangeStartDate,
  // onChangeEndDate,
  // onChangePercent,
  // onClickRandomCode,
  // onCheckAllItem,
  // onCheckItem,
  // selectBox,
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
      noFooter={true}
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

  // const [guest, setGuest] = useState(...selector.sale);

  // const [state, setState] = useState({
  //   checkAllItem: false,
  //   dataSources: {},
  //   loading: false,
  //   applyStatus: "ALL",
  //   codeStatus: false
  // });

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setState({
  //     ...state,
  //     checkAllItem:
  //       sale.selectedItems.length === selector.listItems.length ? true : false,
  //     dataSources: selector.listItems.map(item => {
  //       let boolean = false;
  //       sale.selectedItems.forEach(sItem => {
  //         if (sItem === item.saleId) {
  //           boolean = true;
  //         }
  //       });
  //       return {
  //         ...item,
  //         checked: boolean
  //       };
  //     }),
  //     codeStatus: sale.code ? true : false,
  //     applyStatus: sale.selectedItems.length === 0 ? "ALL" : "CUSTOM"
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selector.listItems, sale.selectedItems, sale.code]);

  const renderProps = {
    ...rest,
    // ...state,
    ...selector,
    // sale,
    // onChangeName: (_, input) =>
    //   setSale({
    //     ...sale,
    //     name: input.value
    //   }),

    // onChangeStatusCode: (_, checkbox) =>
    //   setState({ ...state, codeStatus: checkbox.checked }),

    // onChangeCode: (_, input) =>
    //   setSale({
    //     ...sale,
    //     code: input.value
    //   }),

    // onChangePercent: (_, input) =>
    //   setSale({
    //     ...sale,
    //     percent: parseInt(input.value)
    //   }),

    // onChangeStartDate: date =>
    //   setSale({
    //     ...sale,
    //     startDate: date
    //   }),

    // onChangeEndDate: date =>
    //   setSale({
    //     ...sale,
    //     endDate: date
    //   }),

    // onChangeApplyStatus: (_, radio) =>
    //   setState({ ...state, applyStatus: radio.value }),

    // onClickRandomCode: () =>
    //   setSale({
    //     ...sale,
    //     code: Math.random()
    //       .toString(36)
    //       .substring(3)
    //       .toUpperCase()
    //   }),
    // onCheckItem: (index, checked) => {
    //   let arr = [];
    //   state.dataSources[index].checked = checked;
    //   state.dataSources.forEach(item =>
    //     item.checked === true ? arr.push(item.saleId) : null
    //   );
    //   state.checkAllItem = arr.length === state.dataSources.length;
    //   setState({ ...state });
    //   setSale({ ...sale, selectedItems: arr });
    // },
    // onCheckAllItem: checkAllItem => {
    //   let selectedItems = [];
    //   setState({
    //     ...state,
    //     checkAllItem,
    //     dataSources: state.dataSources.map(item => {
    //       if (checkAllItem) {
    //         selectedItems.push(item.saleId);
    //       }
    //       return {
    //         ...item,
    //         checked: item.checked !== checkAllItem ? checkAllItem : item.checked
    //       };
    //     })
    //   });
    //   setSale({ ...sale, selectedItems });
    // },
    // onPositive: _ => {
    //   if (!selector.codeStatus) {
    //     setSale({ ...sale, code: "" });
    //   }
    //   if (selector.applyStatus === "ALL") {
    //     setSale({ ...sale, selectedItems: [] });
    //   }
    //   return dispatch(doSave(sale));
    // },
    onClose: _ => dispatch(closeModal())
  };
  console.log(renderProps);
  return <Render {...renderProps} />;
};

export default SaleManagementModal;
