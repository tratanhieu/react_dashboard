import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { closeModal } from "../../../../redux/reducers/userGroupReducer";
import ModalModule from "../../../molecules/ModalModule";
import Input from "../../../atoms/Input";
import ToggleActive from "../../../atoms/ToggleActive";
import { Table, Checkbox, TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";

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
        <Input
            required
            label="User Group Name: "
            value={name}
            onChange={onChangeGroupName}
            error={formErrors.name}
    />
        <Table size="small" stickyHeader style={{ marginTop: '8px', marginBottom: '8px' }}>
            <TableHead>
                <TableRow textAlign="center">
                    <TableCell textAlign="left">Feature Name</TableCell>
                    <TableCell>View</TableCell>
                    <TableCell>Create</TableCell>
                    <TableCell>Update</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {features.map((item, index) => (
                <TableRow key={index} textAlign="center">
                    <TableCell textAlign="left">{item.name}</TableCell>
                    <TableCell>
                        <Checkbox
                            value="view"
                            checked={item.view}
                            onChange={(_, checkbox) => onChangePermision(index, checkbox)}
                        />
                    </TableCell>
                    <TableCell>
                        <Checkbox
                            value="create"
                            disabled={!item.view}
                            checked={item.create}
                            onChange={(_, checkbox) => onChangePermision(index, checkbox)}
                        />
                    </TableCell>
                    <TableCell>
                        <Checkbox
                            value="update"
                            disabled={!item.view}
                            checked={item.update}
                            onChange={(_, checkbox) => onChangePermision(index, checkbox)}
                        />
                    </TableCell>
                    <TableCell>
                        <Checkbox
                            value="delete"
                            disabled={!item.view}
                            checked={item.delete}
                            onChange={(_, checkbox) => onChangePermision(index, checkbox)}
                        />
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <ToggleActive
            label="Active"
            checked={status}
            onChange={onChangeActive}
        />
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
