import React, { useState, useEffect } from 'react'
import { Form, Input } from 'semantic-ui-react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import ToggleActive from '../../../atoms/ToggleActive';
// import Button from '../../../atoms/Button';
import { ACTIVE } from '../../../../constants/entites';
import InputWithSlug from '../../../atoms/InputWithSlug';
import { closeModal } from '../../../../redux/actions/productCategoryAction';
import ModalModule from '../../../atoms/ModalModule';
import { doSave, getCreateAction, handleErrors } from '../../../../redux/reducers/productCategoryReducer';

const Render = ({ 
    productCategory = {},
    error,
    openModal, onClose, formLoading, modalFormSuccessMessage,
    onPositive, onChangeName, onChangeStatus, onContinue,
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

    const [productCategory, setProductCategory] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        setProductCategory({ ...selector.productCategory })
        console.log(productCategory)
    }, [selector.productCategory])

    const renderProps = {
        ...selector,
        productCategory,
        onChangeName: (_, input, slug_name, error) => {
            console.log(input)
            setProductCategory({ ...productCategory, name: input.value, slug_name })
            handleErrors({ name: error })
        },
        onChangeStatus: status => setProductCategory({ ...productCategory, status }),
        onPositive: _ => dispatch(doSave(productCategory)),
        onContinue: _ => dispatch(getCreateAction()),
        onClose: _ => dispatch(closeModal())
    }

    return <Render {...renderProps} />
}

export default ProductCategoryModal