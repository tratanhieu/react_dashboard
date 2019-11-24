import React, { useState, useEffect } from 'react'
import { Modal, Icon, Form, Button, Message } from 'semantic-ui-react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import ToggleActive from '../../../atoms/ToggleActive';
// import Button from '../../../atoms/Button';
import { ACTIVE } from '../../../../constants/entites';
import InputWithSlug from '../../../atoms/InputWithSlug';
import { closeModal } from '../../../../redux/actions/productCategoryAction';
import ModalModule from '../../../atoms/ModalModule';
import { doSave, getCreateAction } from '../../../../redux/reducers/productCategoryReducer';

const Render = ({ 
    productCategory = {},
    error,
    openModal, onClose, formLoading, modalFormSuccessMessage,
    onPositive, onChangeName, onChangeStatus, onContinue,
    errors = {},
    ...rest
}) => {
    const title = productCategory.product_category_id ? 'Update' : 'Create'

    useEffect(() => {
        console.log(productCategory)
    }, [productCategory])

    return (
        <ModalModule
            size="mini"
            title={title}
            open={openModal}
            onClose={onClose}
            actionDisable={error}
            modalSuccessMessage={modalFormSuccessMessage}
            actionLoading={formLoading}
            onPositive={onPositive}
            onContinue={onContinue}
            {...rest}
        >
            <Form success={modalFormSuccessMessage} loading={formLoading}>
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
            </Form>
        </ModalModule>
    )
}

const ProductCategoryModal = () => {
    const selector = useSelector(({
        productCategoryReducer: { openModal, modalFormSuccessMessage, formLoading, productCategory, errors } 
    }) => ({ openModal, formLoading, modalFormSuccessMessage, productCategory, errors }), shallowEqual)

    const [state, setState] = useState({
        productCategory: {},
        error: false
    })

    const dispatch = useDispatch()

    useEffect(() => {
        setState({ ...state, productCategory: { ...selector.productCategory } })
    }, [selector.productCategory])

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
        onContinue: _ => dispatch(getCreateAction()),
        onClose: _ => dispatch(closeModal())
    }

    return <Render {...renderProps} />
}

export default ProductCategoryModal