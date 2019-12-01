import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Form } from 'semantic-ui-react'
import _ from 'lodash'

import ToggleActive from '../../../atoms/ToggleActive';
import { ACTIVE } from '../../../../constants/entites';
import ModalModule from '../../../atoms/ModalModule';
import {
    doSave, getCreateAction, closeModal, initialState 
} from '../../../../redux/reducers/productCategoryReducer';
import FormInputSlug from '../../../atoms/FormInputSlug';

const Render = ({ 
    productCategory = {},
    error,
    openModal, onClose, formLoading, modalFormSuccessMessage,
    onPositive, onChangeName, onChangeStatus, onContinue, onChangeSlugValue,
    errors = {},
    ...rest
}) => {
    const title = productCategory.productCategoryId ? 'Update' : 'Create'

    return (
        <ModalModule
            size="mini"
            title={title}
            open={openModal}
            onClose={onClose}
            actionDisable={!_.isEqual(initialState.errors, errors) || !productCategory.name}
            modalSuccessMessage={modalFormSuccessMessage}
            actionLoading={formLoading}
            onPositive={onPositive}
            onContinue={onContinue}
            {...rest}
        >
            <Form loading={formLoading}>
                <FormInputSlug
                    tabIndex={0}
                    fluid
                    type="text"
                    name="name"
                    label="Product Category Name: " 
                    required
                    defaultValue={productCategory.name}
                    defaultSlugValue={productCategory.slugName}
                    valueError={errors.name}
                    slugValueError={errors.slugName}
                    onChange={onChangeName}
                    onChangeSlugValue={onChangeSlugValue} />
                <ToggleActive
                    tabIndex={2}
                    checked={productCategory.status === ACTIVE} 
                    onChangeStatus={onChangeStatus} />
            </Form>
        </ModalModule>
    )
}

const ProductCategoryModal = () => {
    const selector = useSelector(({
        productCategoryReducer: { openModal, modalFormSuccessMessage, formLoading, productCategory, errors } 
    }) => ({ openModal, formLoading, modalFormSuccessMessage, productCategory, errors }), shallowEqual)

    const [productCategory, setProductCategory] = useState({ ...initialState.productCategory })
    const [errors, setErrors] = useState({ ...initialState.errors })

    const dispatch = useDispatch()

    useEffect(() => {
        setProductCategory({ ...selector.productCategory })
    }, [selector.productCategory, selector.openModal, selector.modalFormSuccessMessage])

    useEffect(() => {
        setErrors({ ...selector.errors })
    }, [selector.errors])

    const renderProps = {
        ...selector,
        errors,
        productCategory,
        onChangeName: (_, input, error) => {
            setProductCategory({ 
                ...productCategory,
                name: input.value
            })
            setErrors({ ...errors, [input.name]: error })
        },
        onChangeSlugValue: (slugName, error) => {
            setProductCategory({ 
                ...productCategory,
                slugName
            })
            setErrors({ ...errors, slugName: error })
        },
        onChangeStatus: status => setProductCategory({ ...productCategory, status }),
        onPositive: _ => dispatch(doSave(productCategory)),
        onContinue: _ => dispatch(getCreateAction()),
        onClose: _ => dispatch(closeModal())
    }

    return <Render {...renderProps} />
}

export default ProductCategoryModal