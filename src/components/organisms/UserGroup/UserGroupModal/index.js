import React, { useState } from "react";
import { Form, Table } from "semantic-ui-react";
import ModalModule from "../../../atoms/ModalModule";
import FormInput from "../../../atoms/FormInput";

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
    userGroup,
    clientError,
    onChangeGroupName,
    onChangePermision,
    onChangeActive,
    onPositive
}) => (
    <ModalModule
        title="User Group Modal"
        open={true}
        actionDisable={clientError}
        onPositive={onPositive}
    >
        <Form>
            <FormInput
                required
                label="User Group Name: "
                fluid
                defaultValue={userGroup.name}
                onChange={onChangeGroupName}
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
                {userGroup.features.map((item, index) => (
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
                        checked={item.create}
                        onChange={(_, checkbox) => onChangePermision(index, checkbox)}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Form.Checkbox
                        value="update"
                        checked={item.update}
                        onChange={(_, checkbox) => onChangePermision(index, checkbox)}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Form.Checkbox
                        value="delete"
                        checked={item.delete}
                        onChange={(_, checkbox) => onChangePermision(index, checkbox)}
                        />
                    </Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
            <Form.Checkbox
                label="Active"
                checked={userGroup.status}
                onChange={onChangeActive}
            />
        </Form>
    </ModalModule>
);

const UserGroupModal = ({ onPositive }) => {
    const [state, setState] = useState({
        userGroup: {
            name: "",
            features: [...features],
            status: true
        },
        clientError: true
    });

    const renderProps = {
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
        onPositive: _ => onPositive(state.userGroup)
    };

    return <Render {...renderProps} />;
};

export default UserGroupModal;
