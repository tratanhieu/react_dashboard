import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Button, Modal, Form } from "semantic-ui-react";
import FormInputSlug from "../../../atoms/FormInputSlug";
import ImageUploads from "../../../atoms/ImageUploads";
import ModalModule from "../../../atoms/ModalModule";


import {
    doSave, getCreateAction, closeModal, initialState 
} from '../../../../redux/reducers/productBrandReducer';

const Render = ({
    openModal,
    productBrand: { productBrandId, name, slugName, image = [], status },
    onPositive,
    onClose,
    onChangeName,
    onChangeImage,
    onChangeStatus,
    ...rest
}) => (
    <ModalModule
        size="mini"
        title={productBrandId ? 'Create' : 'Update'}
        open={openModal}
        onClose={onClose}
        onPositive={onPositive}
        {...rest}>
        <Form>
            <FormInputSlug
                label="Name"
                defaultValue={name}
                defaultSlugValue={slugName}
                placeholder="Enter name..."
                onChange={onChangeName}
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
    const selector = useSelector(({
        productBrandReducer: { openModal, modalFormSuccessMessage, formLoading, productBrand, errors } 
    }) => ({ openModal, formLoading, modalFormSuccessMessage, productBrand, errors }), shallowEqual)

    const [productBrand, setProductBrand] = useState({
        name: "",
        slugName: "",
        image: [],
        status: true
    })

    const dispatch = useDispatch()

    const renderProps = {
        ...rest,
        ...selector,
        productBrand,
        onChangeName: (_, input) => setProductBrand({
            ...productBrand,
            name: input.value
        }),
        onChangeImage: (_, images) => setProductBrand({
            ...productBrand,
            image: images
        }),
        onChangeStatus: (_, checkbox) => setProductBrand({
            ...productBrand,
            status: checkbox.checked
        }),
        onPositive: _ => dispatch(doSave(productBrand)),
        onClose: _ => dispatch(closeModal())
    }

    return <Render {...renderProps} />
};

export default ProductBrandModal;
