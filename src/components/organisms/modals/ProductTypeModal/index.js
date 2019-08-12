import React, { useState, useEffect } from 'react'
import { TransitionablePortal, Modal, Button, Icon, Form, Radio } from 'semantic-ui-react'
import { VIEW, UPDATE, INSERT } from '../../../../constants/pages';
import ToggleActive from '../../../atoms/ToggleActive';
import { ACTIVE, HIDDEN } from '../../../../constants/entites';

const ProductTypeModal = ({
    open = false,
    productType,
    modalAction,
    onCreate, onUpdate, onClose,
    ...rest
}) => {

    const [action, setAction] = useState(modalAction)

    const isView = action === VIEW

    const [name, setName] = useState(null)
    const [status, setStatus] = useState(true)

    const title = {
        VIEW: 'Chi tiết',
        UPDATE: 'Cập nhật',
        INSERT: 'Thêm mới'
    }

    useEffect(() => {
        setAction(modalAction)
        setName(productType.name)
        setStatus(productType.status)
    }, [productType, modalAction])

    const handleSave = () => {
        if (action === UPDATE) {
            onUpdate({
                _id: productType._id,
                name,
                status: status ? ACTIVE : HIDDEN
            })
            return
        }
        onCreate({
            name,
            status: status ? ACTIVE : HIDDEN
        })
    }

    return (
        <TransitionablePortal
            open={open} 
            transition={{animation:'scale', duration: 300}}
        >
            <Modal 
                size="mini"
                open={open}
                centered={false}
                onClose={onClose}
                {...rest}
                closeIcon
            >
                <Modal.Header>{title[action]}</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input
                            tabIndex={0}
                            type="text"
                            label="Tên loại Sản phẩm: " 
                            required
                            readOnly={isView}
                            onChange={(_, input) => setName(input.value)}
                            defaultValue={productType.name}
                        />
                        <ToggleActive
                            readOnly={isView}
                            checked={productType.status === ACTIVE} 
                            onChangeStatus={status => setStatus(status)} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    {
                        isView
                        ? <Button
                            icon='edit'
                            labelPosition='left'
                            color="orange"
                            content='Chỉnh sửa'
                            onClick={(() => setAction(UPDATE))}
                        />
                        : <Button
                            color="green"
                            icon='checkmark'
                            labelPosition='left' 
                            onClick={handleSave}
                            content='Lưu'
                        />
                    }
                    <Button
                        onClick={onClose}
                        color="grey"
                    >
                        <Icon name="close"/> Đóng
                    </Button>
                </Modal.Actions>
            </Modal>
        </TransitionablePortal>
    )
}

export default ProductTypeModal