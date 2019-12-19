import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import ImageUploads from "../../../../atoms/ImageUploads";
import ModalModule from "../../../../atoms/ModalModule";

const Render = ({
    openOptionModal,
    option: { packageName, quantity, images, active },
    onChangePackageName,
    onChangeQuantity,
    onChangeImages,
    onChangeActive,
    onPositive,
    onCloseModal
}) => (
    <ModalModule size="small" open={openOptionModal} onClose={onCloseModal} 
        onPositive={onPositive}
        actionDisable={!packageName || quantity <= 0 || images.length === 0}>
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
    </ModalModule>
);

const OptionModal = ({ openOptionModal = true, option: optionProps, onPositive, ...rest }) => {
    const [option, setOption] = useState({ ...optionProps });

    const renderProps = {
        ...rest,
        openOptionModal,
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
