import React from 'react'
import { TransitionablePortal, Modal, Button, Icon, Form, Radio } from 'semantic-ui-react'
import { VIEW } from '../../../../constants/pages';
import ToggleActive from '../../../atoms/ToggleActive';

const ProductTypeModal = ({open = false, productType, action, onClose,...rest}) => {
    
    const isView = action === VIEW

    return (
        <TransitionablePortal
            open={open} 
            transition={{animation:'scale', duration: 300}}
        >
            <Modal 
                size="tiny"
                open={open}
                centered={false}
                onClose={onClose}
                {...rest}
                closeIcon
            >
                <Modal.Header>Chi tiết</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input
                            tabIndex={0}
                            type="text"
                            label="Tên loại Sản phẩm: " 
                            required
                            readOnly={isView}
                            defaultValue={productType.name}
                        />
                        <ToggleActive value="1" onChangeStatus={(status) => console.log(status)} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    {
                        isView
                        ? <Button positive icon='checkmark' labelPosition='left' content='Cập nhât' />
                        : <Button positive icon='checkmark' labelPosition='left' content='Cập nhât' />
                    }
                    <Button negative onClick={onClose} ><Icon name="close"/> Đóng</Button>
                </Modal.Actions>
            </Modal>
        </TransitionablePortal>
    )
}

export default ProductTypeModal