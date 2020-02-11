import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Input from "../../../atoms/Input";
import {
  closeModal,
  doSave,
  setProductBrand,
  setModalStatus
} from "../../../../redux/reducers/productBrandReducer";
import _ from "lodash";
import ModalModule from "../../../molecules/ModalModule";
import ImageUpload from "../../../atoms/ImageUpload";
import ToggleActive from "../../../atoms/ToggleActive";
import FormGroup from "../../../atoms/FormGroup";

const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  productBrand: { productBrandId, productBrandName, slugName, image, status },
  modalStatus,
  onChangeModalStatus,
  productBrandGroupList,
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={!productBrandId ? "Create Product Brand" : "Update Product Brand"}
    open={openModal}
    loading={formLoading}
    modalSuccess={modalFormSuccessMessage}
    minWidth="760px"
    onPositive={onPositive}
    onClose={onClose}
  >
    <FormGroup row>
      <ImageUpload
        source={image}
        onChange={value => onChangeForm(_, { name: "image", value })}
        error={formErrors.image}
      />
      <FormGroup style={{ width: "50%" }}>
        <FormGroup>
          <Input
            required
            label="Product Brand Name: "
            name="productBrandName"
            value={productBrandName}
            onChange={onChangeForm}
            disabled={!!productBrandId}
            error={formErrors.productBrandName}
          />
        {productBrandId && <Input
            label="SlugName"
            required
            name="slugName"
            onChange={onChangeForm}
            value={slugName}
            error={formErrors.slugName}
        />}
          <ToggleActive
            label="Status"
            checked={status}
            onChange={onChangeForm}
          />
        </FormGroup>
      </FormGroup>
    </FormGroup>
  </ModalModule>
);

const ProductBrandModal = () => {
  const selector = useSelector(
    ({
      productBrandReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        productBrand,
        modalStatus,
        productBrandGroupList,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      productBrand,
      modalStatus,
      productBrandGroupList,
      errors
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    onChangeForm: (_, { name, value }) =>
      dispatch(setProductBrand({ ...selector.productBrand, [name]: value })),
    onChangeModalStatus: (_, { name, value }) =>
      dispatch(setModalStatus({ ...selector.modalStatus, [name]: value })),
    onPositive: () => dispatch(doSave(selector.productBrand)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default ProductBrandModal;
