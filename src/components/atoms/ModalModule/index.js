import React from 'react'
import { Modal, Button, TransitionablePortal } from 'semantic-ui-react'

const ModalModule = ({
    transition = {animation:'scale', duration: 300},
    children,
    open,
    title,
    actionDisable,
    actionLoading,
    positiveLabel = 'Save',
    negativeLabel = 'Cancel',
    onClose,
    onPositive,
    ...rest
}) => (
    <TransitionablePortal onClose={onClose} open={open}
        transition={transition}>
        <Modal
            open={open} 
            onClose={onClose}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeIcon={!actionLoading}
            {...rest}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
            <Modal.Actions>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    disabled={actionDisable || actionLoading}
                    content={positiveLabel}
                    onClick={onPositive}
                />
                <Button
                    disabled={actionLoading}
                    color="grey"
                    icon="close"
                    labelPosition='right'
                    content={negativeLabel}
                    onClick={onClose}
                />
            </Modal.Actions>
        </Modal>
    </TransitionablePortal>
)

export default ModalModule