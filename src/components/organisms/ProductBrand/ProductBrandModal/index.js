import React, { useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

const Render = ({
    productBrand: { name, slugName, image, status },
    onPositive,
    onClose,
    onChangeName,
    onChangeImage,
    onChangeStatus,
    ...rest
}) => (
    <Modal
    size="mini"
    closeIcon
    closeOnEscape={false}
    closeOnDimmerClick={false}
    onClose={onClose}
    {...rest}>
        <Modal.Header>Create Product Brand</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Input
                    label="Name"
                    value={name}
                    placeholder="Enter name..."
                    onChange={onChangeName}
                />
                <image />
                <Form.Checkbox
                    label="Active"
                    checked={status}
                    onChange={onChangeStatus}
                />
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button
                onClick={onPositive}
                positive
                labelPosition="right"
                icon="checkmark"
                content="Import"
            />
            <Button onClick={onClose} negative>
                Cancel
            </Button>
        </Modal.Actions>
    </Modal>
);

const ProductBrandModal = ({ onPositive, ...rest }) => {
    const [productBrand, setProductBrand] = useState({
        name: "",
        slugName: "",
        image: "",
        status: true
    })

    const renderProps = {
        ...rest,
        productBrand,
        onChangeName: (_, input) => setProductBrand({
            ...productBrand,
            name: input.value
        }),
        onChangeImage: (_, input) => setProductBrand({
            ...productBrand,
            image: input.value
        }),
        onChangeStatus: (_, checkbox) => setProductBrand({
            ...productBrand,
            status: checkbox.checked
        }),
        onPositive: _ => onPositive(productBrand)
    }

    return <Render {...renderProps} />
};

export default ProductBrandModal;
