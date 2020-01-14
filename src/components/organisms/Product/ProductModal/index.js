import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Form, Button, Icon, Table } from "semantic-ui-react";
import FormSelect from "../../../atoms/FormSelect";
import ModalModule from '../../../atoms/ModalModule';
import Fieldset from "../../../atoms/Fieldset";
import PropertyTableRow from "./PropertyTableRow";
import ProductOptions from "./ProductOptions";

import { closeModal } from '../../../../redux/reducers/productReducer';
import OptionModal from "./ProductOptions/OptionModal";

const options = [
    { key: "1", text: "Car", value: "car" },
    { key: "2", text: "Bike", value: "bike" },
    { key: "3", text: "Other", value: "other" }
];

const Render = ({
    openModal = false,
    property = {},
    properties = [],
    onChangePropetyName,
    onChangePropetyValue,
    onAddProperty,
    onUpdateProperty,
    onRemoveProperty,
    onClose,
    ...rest
}) => (
    <ModalModule title="Thêm sản phẩm" open={openModal} onClose={onClose}>
        <Form>
            <Form.Input label="Name: " placeholder="Input name" />
            <Form.Group widths="equal">
                <FormSelect
                    label="Product Category: "
                    options={options}
                    placeholder="-- Select Category --"
                />
                <FormSelect
                    label="Product Type Group: "
                    options={options}
                    placeholder="-- Select Type Group --"
                />
                <FormSelect
                    label="Product Type: "
                    options={options}
                    placeholder="-- Select Product Type --"
                />
            </Form.Group>
            <Form.Group widths="equal">
                <FormSelect
                    label="Made in: "
                    options={options}
                    placeholder="-- Select Product Type Group --"
                />
                <FormSelect
                    label="Brand: "
                    options={options}
                    placeholder="-- Select Product Brand --"
                />
            </Form.Group>
            <Fieldset icon="info circle" title="Summary Product Detail">
                <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={{ padding: "8px 16px" }}>
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell style={{ padding: "8px 16px" }}>
                            Value
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {properties.map((item, index) => (
                        <PropertyTableRow
                            item={item}
                            key={index}
                            onUpdateProperty={onUpdateProperty}
                            onRemoveProperty={onRemoveProperty}
                        />
                    ))}
                    <Table.Row textAlign="center">
                    <Table.Cell>
                        <Form.Input
                        placeholder="Enter Property Name..."
                        onChange={onChangePropetyName}
                        value={property.name}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Form.Input
                        placeholder="Enter Property Value..."
                        onChange={onChangePropetyValue}
                        value={property.value}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Button
                        primary
                        size="mini"
                        disabled={!property.name || !property.value}
                        onClick={onAddProperty}
                        >
                        <Icon name="add" />
                        Add
                        </Button>
                    </Table.Cell>
                    </Table.Row>
                </Table.Body>
                </Table>
            </Fieldset>
            <Fieldset label="Product Package" icon="box">
                <ProductOptions />
                <OptionModal />
            </Fieldset>
            <Form.TextArea label="Description: " placeholder="Input name.." />
            <Form.Checkbox label="Active" />
        </Form>
    </ModalModule>
);

const ProductModal = () => {
    const selector = useSelector(({
        productReducer: { openModal, modalFormSuccessMessage, formLoading, product, errors } 
    }) => ({ openModal, formLoading, modalFormSuccessMessage, product, errors }), shallowEqual)

    const [state, setState] = useState({
        property: {
            name: "",
            value: ""
        },
        properties: []
    });

    const dispatch = useDispatch();

    const renderProps = {
        ...selector,
        ...state,
        onChangePropetyName: (_, input) =>
        setState({
            ...state,
            property: { ...state.property, name: input.value }
        }),
        onChangePropetyValue: (_, input) =>
        setState({
            ...state,
            property: { ...state.property, value: input.value }
        }),
        onAddProperty: () => {
            if (state.property.name && state.property.value) {
                setState({
                ...state,
                property: { name: "", value: "" },
                properties: [...state.properties, state.property]
                });
            }
        },
        onUpdateProperty: (index, name, value) => {
            if (name && value) {
                state.properties[index] = { name, value };
                setState({ ...state });
            }
        },
        onRemoveProperty: index => {
            state.properties.splice(index, 1);
            setState({ ...state });
        },
        onClose: _ => dispatch(closeModal())
    };
    return <Render {...renderProps} />;
    };

export default ProductModal;
