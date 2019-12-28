import React from "react";
import { Modal, Button, Icon, TransitionablePortal } from "semantic-ui-react";

const ModalModule = ({
  transition = { animation: "scale", duration: 300 },
  children,
  open,
  title,
  size,
  closeIcon = true,
  modalSuccessMessage,
  actionDisable,
  actionLoading,
  positiveLabel = "Save",
  negativeLabel = "Cancel",
  onClose,
  onPositive,
  onNegative,
  onContinue,
  justClose,
  ...rest
}) => (
  <TransitionablePortal onClose={onClose} open={open} transition={transition}>
    <Modal
      open={open}
      onClose={onClose}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      size={modalSuccessMessage ? "mini" : size}
      closeIcon={closeIcon && !actionLoading && !modalSuccessMessage}
      {...rest}
    >
      {!modalSuccessMessage ? <Modal.Header>{title}</Modal.Header> : null}
      <Modal.Content>
        {modalSuccessMessage ? (
          <div style={{ textAlign: "center" }}>
            <Icon name="check circle outline" size="huge" color="green" />
            <p style={{ margin: "16px 0px" }} className="modalSuccessMessage">
              {modalSuccessMessage}
            </p>
            <Button positive content="Continue" onClick={onContinue} />
            <Button color="grey" content="Close" onClick={onClose} />
          </div>
        ) : (
          children
        )}
      </Modal.Content>
      {!modalSuccessMessage ? (
        !justClose ? (
          <Modal.Actions>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              disabled={actionDisable || actionLoading}
              content={positiveLabel}
              onClick={onPositive}
            />
            <Button
              disabled={actionLoading}
              color="grey"
              content={negativeLabel}
              onClick={onNegative ? onNegative : onClose}
            />
          </Modal.Actions>
        ) : (
          <Modal.Actions>
            <Button
              disabled={actionLoading}
              color="grey"
              content={negativeLabel}
              onClick={onNegative ? onNegative : onClose}
            />
          </Modal.Actions>
        )
      ) : null}
    </Modal>
  </TransitionablePortal>
);

export default ModalModule;
