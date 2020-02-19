import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Input from "../../../atoms/Input";
import {
  closeModal,
  doSave,
  setProductType
} from "../../../../redux/reducers/productTypeReducer";
import ModalModule from "../../../molecules/ModalModule";
import ToggleActive from "../../../atoms/ToggleActive";
import SelectSearch from "../../../atoms/SelectSearch";

const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  productType: {
    productTypeId,
    name,
    typeGroupName,
    createDate,
    updateDate,
    status
  },
  typeGroupList,
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={
      productTypeId ? "Update Product Type" : "Create Product Type"
    }
    open={openModal}
    loading={formLoading}
    modalSuccess={modalFormSuccessMessage}
    minWidth="320px"
    onPositive={onPositive}
    onClose={onClose}
  >
    <Input
      required
      label="Product Type Name: "
      name="productTypeName"
      value={name}
      onChange={onChangeForm}
      disabled={!!productTypeId}
      error={formErrors.name}
    />

    <SelectSearch
      style={{ display: "block" }}
      label="Type Group"
      options={typeGroupList}
      value={typeGroupName}
      getOptionLabel={option => option.typeGroupName}
      onChange={(_, value) => onChangeForm(_, { name: "typeGroupName", value })}
      error={formErrors.userGroup}
    />
    <ToggleActive label="Active" checked={status} onChange={onChangeForm} />
  </ModalModule>
);

const ProductTypeModal = () => {
  const selector = useSelector(
    ({
      productTypeReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        modalStatus,
        productType,
        loading,
        typeGroupList,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      modalStatus,
      productType,
      loading,
      typeGroupList,
      errors
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    onChangeForm: (_, { name, value }) =>
      dispatch(
        setProductType({ ...selector.productType, [name]: value })
      ),
    onPositive: () => dispatch(doSave(selector.productType)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default ProductTypeModal;