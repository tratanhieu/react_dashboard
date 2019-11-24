import React from 'react'
import { Modal, Button, TransitionablePortal, Message } from 'semantic-ui-react'

const ModalModule = ({
    transition = {animation:'scale', duration: 300},
    children,
    open,
    title,
    modalSuccessMessage,
    actionDisable,
    actionLoading,
    positiveLabel = 'Save',
    negativeLabel = 'Cancel',
    onClose,
    onPositive,
    onContinue,
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
                {modalSuccessMessage ? 
                    <Message success>{modalSuccessMessage}</Message> : children
                }
            </Modal.Content>
            <Modal.Actions>
                { modalSuccessMessage ?
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content="Continue"
                        onClick={onContinue}
                    /> : 
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        disabled={actionDisable || actionLoading}
                        content={positiveLabel}
                        onClick={onPositive}
                    /> 
                }
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