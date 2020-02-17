import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Input from "../../../atoms/Input";
import {
  closeModal,
  doSave,
  setProductCategory,
  setModalStatus
} from "../../../../redux/reducers/productCategoryReducer";
import _ from "lodash";
import ModalModule from "../../../molecules/ModalModule";
import ToggleActive from "../../../atoms/ToggleActive";
import FormGroup from "../../../atoms/FormGroup";

const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  productCategory: { productCategoryId, name, slugName, image, status },
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={
      !productCategoryId ? "Create Product Category" : "Update Product Category"
    }
    open={openModal}
    loading={formLoading}
    modalSuccess={modalFormSuccessMessage}
    minWidth="320px"
    onPositive={onPositive}
    onClose={onClose}
  >
    <FormGroup>
      <Input
        required
        label="Product Category Name: "
        name="name"
        value={name}
        onChange={onChangeForm}
        disabled={!!productCategoryId}
        error={formErrors.name}
      />
      {productCategoryId && (
        <Input
          label="SlugName"
          required
          name="slugName"
          onChange={onChangeForm}
          value={slugName}
          error={formErrors.slugName}
        />
      )}
      <ToggleActive label="Status" checked={status} onChange={onChangeForm} />
    </FormGroup>
  </ModalModule>
);

const ProductCategoryModal = () => {
  const selector = useSelector(
    ({
      productCategoryReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        productCategory,
        modalStatus,
        productCategoryGroupList,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      productCategory,
      modalStatus,
      productCategoryGroupList,
      errors
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    onChangeForm: (_, { name, value }) =>
      dispatch(
        setProductCategory({ ...selector.productCategory, [name]: value })
      ),
    onChangeModalStatus: (_, { name, value }) =>
      dispatch(setModalStatus({ ...selector.modalStatus, [name]: value })),
    onPositive: () => dispatch(doSave(selector.productCategory)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default ProductCategoryModal;
