import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Form } from "semantic-ui-react";
import FormInputSlug from "../../../atoms/FormInputSlug";
import ImageUploads from "../../../atoms/ImageUploads";
import ModalModule from "../../../atoms/ModalModule";

import {
    doSave, closeModal 
} from '../../../../redux/reducers/productBrandReducer';

const Render = ({
  productBrand: { productBrandId, name, slugName, image = [], status },
  openModal,
  formLoading,
  modalFormSuccessMessage,
  onPositive,
  onClose,
  onChangeName,
  onChangeImage,
  onChangeStatus,
  onChangeSlugValue,
  errors = {},
  ...rest
}) => (
  <ModalModule
    size="mini"
    title={productBrandId ? "Update" : "Create"}
    open={openModal}
    onClose={onClose}
    onPositive={onPositive}
    {...rest}
  >
    <Form>
      <FormInputSlug
        tabIndex={0}
        fluid
        type="text"
        label="Name"
        defaultValue={name}
        defaultSlugValue={slugName}
        placeholder="Enter name..."
        valueError={errors.name}
        slugValueError={errors.slugName}
        onChange={onChangeName}
        onChangeSlugValue={onChangeSlugValue}
        required
      />
      <ImageUploads dataSources={image} onChange={onChangeImage} />
      <Form.Checkbox
        label="Active"
        checked={status}
        onChange={onChangeStatus}
      />
    </Form>
  </ModalModule>
);

const ProductBrandModal = ({ onPositive, ...rest }) => {
  const selector = useSelector(
    ({
      productBrandReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        // productBrand,
        errors
      }
    }) => ({
      openModal,
      formLoading,
      modalFormSuccessMessage,
      // productBrand,
      errors
    }),
    shallowEqual
  );

  const [productBrand, setProductBrand] = useState({
    name: "",
    slugName: "",
    image: [],
    status: true
  });

  const dispatch = useDispatch();

  const renderProps = {
    ...rest,
    ...selector,
    productBrand,
    onChangeName: (_, input, slugName) => {
      setProductBrand({
        ...productBrand,
        name: input.value,
        slugName: slugName ? slugName : productBrand.slugName
      })
    },
    onChangeSlugValue: (slugName, error) => {
      setProductBrand({
        ...productBrand,
        slugName
      });
    },
    onChangeImage: images =>{
      setProductBrand({
        ...productBrand,
        image: images
      })
  },
    onChangeStatus: (_, checkbox) =>
      setProductBrand({
        ...productBrand,
        status: checkbox.checked
      }),
    onPositive: _ => dispatch(doSave(productBrand)),
    onClose: _ => dispatch(closeModal())
  };
  return <Render {...renderProps} />;
};

export default ProductBrandModal;
