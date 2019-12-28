import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Form } from "semantic-ui-react";
import FormInput from "../../../atoms/FormInput";
import FormInputSlug from "../../../atoms/FormInputSlug";
import ImageUploads from "../../../atoms/ImageUploads";
import ModalModule from "../../../atoms/ModalModule";

import { doSave, closeModal, setAddress } from "../../../../redux/reducers/producerReducer";

const Render = ({
  producer: { producerId, name, phone, address, trader, status },
  openModal,
  formLoading,
  modalFormSuccessMessage,
  selectAddress,
  selectAddressList,
  onChangeProvince,
  onChangeDistrict,
  onChangeSubDistrict,
  onPositive,
  onClose,
  onChangeName,
  onChangePhone,
  onChangeAddress,
  onChangeStatus,
  onChangeTrader,
  errors = {},
  ...rest
}) => (
  <ModalModule
    size="small"
    title={producerId ? "Update" : "Create"}
    open={openModal}
    onClose={onClose}
    onPositive={onPositive}
    {...rest}
  >
    <Form>
      <Form.Group>
        <FormInput
          label="Tên Nhà Cung Cấp: "
          placeholder="Nhập Tên Nhà Cung Cấp"
          value={name}
          onChange={onChangeName}
          required
          width={12}
        />
        <FormInput
          label="Số Điện Thoại: "
          placeholder="Nhập SĐT"
          value={phone}
          onChange={onChangePhone}
          required
          width={4}
        />
      </Form.Group>
      <Form.Group widths={3}>
        <Form.Select
          label="Tỉnh/ Thành Phố"
          options={selectAddressList.provinceList}
          placeholder="Tỉnh/ Thành Phố"
          value={selectAddress.province}
          onChange={(_, select) => onChangeProvince(select.value)}
        />
        <Form.Select
          label="Quận/ Huyện"
          options={selectAddressList.districtList}
          placeholder="Quận/ Huyện"
          value={selectAddress.district}
          onChange={(_, select) => onChangeDistrict(select.value)}
          disabled={!selectAddress.province}
        />
        <Form.Select
          label="Phường/ Xã"
          options={selectAddressList.subDistrictList}
          placeholder="Phường/ Xã"
          value={selectAddress.subDistrict}
          onChange={(_, select) => onChangeSubDistrict(select.value)}
          disabled={!selectAddress.district}
        />
      </Form.Group>
      <Form.Group>
        <FormInput
          label="Địa Chỉ: "
          placeholder="Nhập Địa Chỉ"
          value={address}
          onChange={onChangeAddress}
          required
          width={10}
        />
        <FormInput
          label="Người Giao Dịch: "
          placeholder="Nhập Người Giao Dịch"
          value={trader}
          onChange={onChangeTrader}
          required
          width={6}
        />
      </Form.Group>
      <Form.Checkbox
        label="Active"
        checked={status}
        onChange={onChangeStatus}
      />
    </Form>
  </ModalModule>
);

const ProducerModal = ({ onPositive, ...rest }) => {
  const selector = useSelector(
    ({
      producerReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        producer,
        selectAddress,
        selectAddressList,
        errors
      }
    }) => ({
      openModal,
      formLoading,
      modalFormSuccessMessage,
      producer,
      selectAddress,
      selectAddressList,
      errors
    }),
    shallowEqual
  );

  const [producer, setProducer] = useState(
    Object.keys(selector.producer).length
      ? {
          ...selector.producer
        }
      : {
          name: "",
          phone: "",
          address: "",
          trader: ""
        }
  );

  const dispatch = useDispatch();

  const renderProps = {
    ...rest,
    ...selector,
    producer,
    onChangeName: (_, input) =>
      setProducer({
        ...producer,
        name: input.value
      }),
    onChangePhone: (_, input) =>
      setProducer({
        ...producer,
        phone: input.value
      }),
    onChangeAddress: (_, input) =>
      setProducer({
        ...producer,
        address: input.value 
      }),
    onChangeTrader: (_, input) =>
      setProducer({
        ...producer,
        trader: input.value
      }),
    onChangeStatus: (_, checkbox) =>
      setProducer({
        ...producer,
        status: checkbox.checked
      }),

    onChangeProvince: province => 
      dispatch(setAddress({ ...selector.selectAddress, province })),
    onPositive: _ => dispatch(doSave(producer)),
    onClose: _ => dispatch(closeModal())
  };
  console.log(renderProps)
  return <Render {...renderProps} />;
};

export default ProducerModal;
