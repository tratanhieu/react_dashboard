import React, { useState, useEffect } from 'react'
import { TransitionablePortal, Modal, Icon, Form, Button } from 'semantic-ui-react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import ToggleActive from '../../../atoms/ToggleActive';
// import Button from '../../../atoms/Button';
import { ACTIVE } from '../../../../constants/entites';
import InputWithSlug from '../../../atoms/InputWithSlug';
import { 
    closeModal } from '../../../../redux/actions/productCategoryAction';
import { doSave } from '../../../../redux/api-actions/productCategoryApiAction';
import ImageUploads from '../../../atoms/ImageUploads';

const Render = ({ 
    productCategory,
    modalAction, viewMode = false,
    openModal, onClose, formLoading, name, slug_name, status,
    onClickSave, onChangeName, onChangeStatus, handChangeViewMode,
    isError, errors = {},
    ...rest
}) => {
    const title = {
        VIEW: 'Chi tiết',
        UPDATE: 'Cập nhật',
        INSERT: 'Thêm mới'
    }

    return (
        <TransitionablePortal
            open={openModal} 
            transition={{animation:'scale', duration: 300}}>
            <Modal 
                size="mini"
                open={openModal}
                centered={false}
                onClose={onClose}
                {...rest}
                closeOnDimmerClick={false}
                closeIcon={!formLoading}>
                <Modal.Header>{title[modalAction]}</Modal.Header>
                <Modal.Content>
                    <Form loading={formLoading}>
                        <InputWithSlug
                            tabIndex={0}
                            type="text"
                            label="Tên loại Sản phẩm: " 
                            required
                            style={{width: '100%'}}
                            readOnly={viewMode}
                            onChange={onChangeName}
                            defaultValue={productCategory.name}
                            error={errors.name} />
                        <ImageUploads onChange={images => console.log(images)} />
                        <ToggleActive
                            readOnly={viewMode}
                            checked={productCategory.status === ACTIVE} 
                            onChangeStatus={onChangeStatus} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    {
                        viewMode
                        ? <Button
                            icon='edit'
                            labelPosition='left'
                            color="orange"
                            content='Chỉnh sửa'
                            onClick={handChangeViewMode} />
                        : <Button
                            color="green"
                            icon='checkmark'
                            labelPosition='left'
                            disabled={isError || formLoading}
                            onClick={onClickSave}
                            content='Lưu' />
                    }
                    <Button onClick={onClose} disabled={formLoading} color="grey" >
                        <Icon name="close"/> Đóng
                    </Button>
                </Modal.Actions>
            </Modal>
        </TransitionablePortal>
    )
}

const ProductCategoryModal = _ => {
    const selector = useSelector(({ productCategoryReducer }) => ({
        openModal: productCategoryReducer.openModal,
        modalAction: productCategoryReducer.modalAction,
        formLoading: productCategoryReducer.formLoading,
        productCategory: productCategoryReducer.productCategory,
        errors: productCategoryReducer.errors
    }), shallowEqual)

    const [form, setForm] = useState({...selector.productCategory, isError: true})

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(selector.errors)
    }, [selector.errors])

    const renderProps = {
        ...selector,
        isError: form.isError,
        onChangeName: (_, name, slug_name, error) => setForm({
            ...form,
            name,
            slug_name,
            isError: error ? true : false
        }),
        onChangeStatus: status => setForm({
            ...form,
            status,
        }),
        onClickSave: _ => dispatch(doSave(form, selector.modalAction)),
        onClose: _ => dispatch(closeModal())
    }

    return (
        <Render {...renderProps} />
    )
}

export default ProductCategoryModal