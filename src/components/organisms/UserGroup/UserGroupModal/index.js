import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Form, Table } from "semantic-ui-react";
import { closeModal } from "../../../../redux/reducers/userGroupReducer";
import ModalModule from "../../../molecules/ModalModule";
import Input from "../../../atoms/Input";
import ToggleActive from "../../../atoms/ToggleActive";

const features = [
    {
        name: "Manage Users",
        view: false,
        create: false,
        update: false,
        delete: false
    },
    {
        name: "Manage Products",
        view: false,
        create: false,
        update: false,
        delete: false
    },
    {
        name: "Manage Posts",
        view: false,
        create: false,
        update: false,
        delete: false
    },
    {
        name: "Manage Comments",
        view: false,
        create: false,
        update: false,
        delete: false
    },
    {
        name: "Manage Orders",
        view: false,
        create: false,
        update: false,
        delete: false
    }
];

const Render = ({
    openModal,
    userGroup: { name, features, status },
    errors: { formErrors },
    onChangeGroupName,
    onChangePermision,
    onChangeActive,
    onPositive,
    onClose
}) => (
    <ModalModule
        title="User Group Modal"
        minWidth="600px"
        open={openModal}
        onClose={onClose}
        onPositive={onPositive}
    >
        <Form>
            <Input
                required
                label="User Group Name: "
                value={name}
                onChange={onChangeGroupName}
                error={formErrors.name}
            />
            <label>
                <b>Select Features:</b>
            </label>
            <Table>
                <Table.Header>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell textAlign="left">Feature Name</Table.HeaderCell>
                        <Table.HeaderCell>View</Table.HeaderCell>
                        <Table.HeaderCell>Create</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {features.map((item, index) => (
                    <Table.Row key={index} textAlign="center">
                        <Table.Cell textAlign="left">{item.name}</Table.Cell>
                        <Table.Cell>
                            <Form.Checkbox
                                value="view"
                                checked={item.view}
                                onChange={(_, checkbox) => onChangePermision(index, checkbox)}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Form.Checkbox
                                value="create"
                                disabled={!item.view}
                                checked={item.create}
                                onChange={(_, checkbox) => onChangePermision(index, checkbox)}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Form.Checkbox
                                value="update"
                                disabled={!item.view}
                                checked={item.update}
                                onChange={(_, checkbox) => onChangePermision(index, checkbox)}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Form.Checkbox
                                value="delete"
                                disabled={!item.view}
                                checked={item.delete}
                                onChange={(_, checkbox) => onChangePermision(index, checkbox)}
                            />
                        </Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
            <ToggleActive
                label="Active"
                checked={status}
                onChange={onChangeActive}
            />
        </Form>
    </ModalModule>
);

const UserGroupModal = ({ onPositive }) => {
    const selector = useSelector(({
        userGroupReducer: { openModal, modalFormSuccessMessage, formLoading, productCategory, errors } 
    }) => ({ openModal, formLoading, modalFormSuccessMessage, productCategory, errors }), shallowEqual)
    
    const [state, setState] = useState({
        userGroup: {
            name: "",
            features: [...features],
            status: true
        },
        clientError: true
    });

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        ...state,
        onChangeGroupName: (_, name, clientError) =>
        setState({
            ...state,
            userGroup: {
                ...state.userGroup,
                name
            },
            clientError
        }),
        onChangePermision: (index, checkbox) => {
            state.userGroup.features[index][checkbox.value] = checkbox.checked;
            setState({ ...state });
        },
        onChangeActive: (_, checkbox) =>
        setState({
            ...state,
            userGroup: {
                ...state.userGroup,
                status: checkbox.checked
            }
        }),
        onPositive: _ => onPositive(state.userGroup),
        onClose: _ => dispatch(closeModal())
    };

    return <Render {...renderProps} />;
};

export default UserGroupModal;
