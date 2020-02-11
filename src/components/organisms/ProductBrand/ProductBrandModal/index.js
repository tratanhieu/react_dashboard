// import React, { useState } from "react";
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// import { Form } from "semantic-ui-react";
// import FormInputSlug from "../../../atoms/FormInputSlug";
// import ImageUploads from "../../../atoms/ImageUploads";
// import ModalModule from "../../../atoms/ModalModule";

// import {
//     doSave, closeModal
// } from '../../../../redux/reducers/productBrandReducer';

// const Render = ({
//   productBrand: { productBrandId, name, slugName, image = [], status },
//   openModal,
//   formLoading,
//   modalFormSuccessMessage,
//   onPositive,
//   onClose,
//   onChangeName,
//   onChangeImage,
//   onChangeStatus,
//   onChangeSlugValue,
//   errors = {},
//   ...rest
// }) => (
//   <ModalModule
//     size="mini"
//     title={productBrandId ? "Update" : "Create"}
//     open={openModal}
//     onClose={onClose}
//     onPositive={onPositive}
//     {...rest}
//   >
//     <Form>
//       <FormInputSlug
//         tabIndex={0}
//         fluid
//         type="text"
//         label="Name"
//         defaultValue={name}
//         defaultSlugValue={slugName}
//         placeholder="Enter name..."
//         valueError={errors.name}
//         slugValueError={errors.slugName}
//         onChange={onChangeName}
//         onChangeSlugValue={onChangeSlugValue}
//         required
//       />
//       <ImageUploads dataSources={image} onChange={onChangeImage} />
//       <Form.Checkbox
//         label="Active"
//         checked={status}
//         onChange={onChangeStatus}
//       />
//     </Form>
//   </ModalModule>
// );

// const ProductBrandModal = ({ onPositive, ...rest }) => {
//   const selector = useSelector(
//     ({
//       productBrandReducer: {
//         openModal,
//         modalFormSuccessMessage,
//         formLoading,
//         // productBrand,
//         errors
//       }
//     }) => ({
//       openModal,
//       formLoading,
//       modalFormSuccessMessage,
//       // productBrand,
//       errors
//     }),
//     shallowEqual
//   );

//   const [productBrand, setProductBrand] = useState({
//     name: "",
//     slugName: "",
//     image: [],
//     status: true
//   });

//   const dispatch = useDispatch();

//   const renderProps = {
//     ...rest,
//     ...selector,
//     productBrand,
//     onChangeName: (_, input, slugName) => {
//       setProductBrand({
//         ...productBrand,
//         name: input.value,
//         slugName: slugName ? slugName : productBrand.slugName
//       })
//     },
//     onChangeSlugValue: (slugName, error) => {
//       setProductBrand({
//         ...productBrand,
//         slugName
//       });
//     },
//     onChangeImage: images =>{
//       setProductBrand({
//         ...productBrand,
//         image: images
//       })
//   },
//     onChangeStatus: (_, checkbox) =>
//       setProductBrand({
//         ...productBrand,
//         status: checkbox.checked
//       }),
//     onPositive: _ => dispatch(doSave(productBrand)),
//     onClose: _ => dispatch(closeModal())
//   };
//   return <Render {...renderProps} />;
// };

// export default ProductBrandModal;

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
import { makeSlug } from "../../../../commons/utils";
import CheckBox from "../../../atoms/CheckBox";
import SelectSearch from "../../../atoms/SelectSearch";
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
