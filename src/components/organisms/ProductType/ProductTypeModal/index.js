import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Input from "../../../atoms/Input";
import {
  closeModal,
  doSave,
  setProductType,
  setModalStatus
} from "../../../../redux/reducers/productTypeReducer";
import ModalModule from "../../../molecules/ModalModule";
import ToggleActive from "../../../atoms/ToggleActive";
import TableCell from "@material-ui/core/TableCell";
import SelectSearch from "../../../atoms/SelectSearch";
import { ALL, CUSTOM } from "../../../../constants/entites";

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
  loading,
  typeGroupList,
  modalStatus,
  onChangeCodeStatus,
  onChangeApplyStatus,
  onChangeCode,
  onAddCode,
  onRemoveCode,
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={
      productTypeId ? "Update ProductType" : "Create ProductType"
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