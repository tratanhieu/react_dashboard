import React, { useState } from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import ImageUploads from "../../../../atoms/ImageUploads";

const Render = ({
    openModal,
    option: { packageName, quantity, images, active },
    onChangePackageName,
    onChangeQuantity,
    onChangeImages,
    onChangeActive,
    onPositive,
    onCloseModal
}) => (
    <Modal size="small" open={openModal} onClose={onCloseModal} closeIcon>
        <Modal.Header>Add Product Options</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Group widths="equal">
                    <Form.Input
                        label="Package"
                        placeholder="Package Type..."
                        value={packageName}
                        onChange={onChangePackageName} />
                    <Form.Input
                        label="Quantity/Product"
                        placeholder="0"
                        value={quantity}
                        onChange={onChangeQuantity} />
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Images: </label>
                        <ImageUploads dataSources={images} onChange={onChangeImages} />
                    </Form.Field>
                </Form.Group>
                <Form.Checkbox
                    label="Active"
                    checked={active}
                    onChange={onChangeActive} />
            </Form>
            </Modal.Content>
            <Modal.Actions>
            <Button
                size="small"
                positive
                onClick={onPositive}
                icon="checkmark"
                labelPosition="left"
                disabled={!packageName || quantity <= 0 || images.length === 0}
                content="OK"
            />
            <Button size="small" negative onClick={onCloseModal}>
                Cancel
            </Button>
        </Modal.Actions>
    </Modal>
);

const OptionModal = ({ option: optionProps, onPositive, ...rest }) => {
    const [option, setOption] = useState({ ...optionProps });

    const renderProps = {
        ...rest,
        option,
        onChangePackageName: (_, input) => setOption({
            ...option,
            packageName: input.value
        }),
        onChangeQuantity: (_, input) => setOption({
            ...option,
            quantity: input.value
        }),
        onChangeImages: images => setOption({
            ...option,
            images
        }),
        onChangeActive: (_, checkbox) => setOption({
            ...option,
            active: checkbox.checked
        }),
        onPositive: _ => onPositive(option)
    };

    return <Render {...renderProps} />
};

export default OptionModal;
