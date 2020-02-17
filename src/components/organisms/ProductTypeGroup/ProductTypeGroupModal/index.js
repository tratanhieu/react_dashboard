import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Input from "../../../atoms/Input";
import {
  closeModal,
  doSave,
  setProductTypeGroup,
  setModalStatus
} from "../../../../redux/reducers/productTypeGroupReducer";
import ModalModule from "../../../molecules/ModalModule";
import ToggleActive from "../../../atoms/ToggleActive";
import TableCell from "@material-ui/core/TableCell";
import SelectSearch from "../../../atoms/SelectSearch";
import { ALL, CUSTOM } from "../../../../constants/entites";

const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  productTypeGroup: {
    productTypeGroupId,
    name,
    categoryName,
    createDate,
    updateDate,
    status
  },
  loading,
  categoryList,
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
      productTypeGroupId ? "Update ProductTypeGroup" : "Create ProductTypeGroup"
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
      label="ProductTypeGroup Name: "
      name="ProductTypeGroupName"
      value={name}
      onChange={onChangeForm}
      disabled={!!productTypeGroupId}
      error={formErrors.name}
    />

    <SelectSearch
      style={{ display: "block" }}
      label="Category"
      options={categoryList}
      value={categoryName}
      getOptionLabel={option => option.categoryName}
      onChange={(_, value) => onChangeForm(_, { name: "categoryName", value })}
      error={formErrors.userGroup}
    />
    <ToggleActive label="Active" checked={status} onChange={onChangeForm} />
  </ModalModule>
);

const ProductTypeGroupModal = () => {
  const selector = useSelector(
    ({
      productTypeGroupReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        modalStatus,
        productTypeGroup,
        loading,
        categoryList,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      modalStatus,
      productTypeGroup,
      loading,
      categoryList,
      errors
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    onChangeForm: (_, { name, value }) =>
      dispatch(
        setProductTypeGroup({ ...selector.productTypeGroup, [name]: value })
      ),
    onPositive: () => dispatch(doSave(selector.productTypeGroup)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default ProductTypeGroupModal;
