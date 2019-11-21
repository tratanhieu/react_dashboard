import React, { useState, useEffect } from 'react'
import { Modal, Icon, Form, Button, Message } from 'semantic-ui-react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import ToggleActive from '../../../atoms/ToggleActive';
// import Button from '../../../atoms/Button';
import { ACTIVE } from '../../../../constants/entites';
import InputWithSlug from '../../../atoms/InputWithSlug';
import { closeModal } from '../../../../redux/actions/productCategoryAction';
import { doSave } from '../../../../redux/api-actions/productCategoryApiAction';
import ModalModule from '../../../atoms/ModalModule';

const Render = ({ 
    productCategory = {},
    error,
    openModal, onClose, formLoading,
    onPositive, onChangeName, onChangeStatus,
    errors = {},
    ...rest
}) => {
    const title = productCategory.product_category_id ? 'Update' : 'Create'

    return (
        <ModalModule
            size="mini"
            title={title}
            open={openModal}
            onClose={onClose}
            actionDisable={error}
            actionLoading={formLoading}
            onPositive={onPositive}
            {...rest}
        >
            <Form error loading={formLoading}>
                <InputWithSlug
                    tabIndex={0}
                    fluid
                    type="text"
                    label="Tên loại Sản phẩm: " 
                    required
                    onChange={onChangeName}
                    defaultValue={productCategory.name}
                    error={errors.name} />
                <ToggleActive
                    checked={productCategory.status === ACTIVE} 
                    onChangeStatus={onChangeStatus} />
                <Message error>{title} Failed!!</Message>
                <Message success>{title} Success!!</Message>
            </Form>
        </ModalModule>
    )
}

const ProductCategoryModal = ({ onPositive }) => {
    const selector = useSelector(({
        productCategoryReducer: { openModal, formLoading, productCategory, errors } 
    }) => ({ openModal, formLoading, productCategory, errors }), shallowEqual)

    const [state, setState] = useState({
        productCategory: { ...selector.productCategory },
        error: false
    })

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        ...state,
        onChangeName: (_, name, slug_name, error) => setState({
            ...state,
            productCategory: {
                ...state.productCategory,
                name,
                slug_name
            },
            error
        }),
        onChangeStatus: status => setState({
            ...state,
            productCategory: {
                ...state.productCategory,
                status
            }
        }),
        onPositive: _ => dispatch(doSave(state.productCategory)),
        onClose: _ => dispatch(closeModal())
    }

    return <Render {...renderProps} />
}

export default ProductCategoryModal