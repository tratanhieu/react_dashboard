import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Form } from "semantic-ui-react";
import ModalModule from "../../../molecules/ModalModule";
import FormInput from "../../../atoms/FormInput";
import FormSelect from "../../../atoms/FormSelect";
import { initialState, closeModal } from '../../../../redux/reducers/userReducer'
import _ from "lodash";

const userGroups = [
    { key: 12345, value: 12345, text: "Administrator" },
    { key: 12346, value: 12346, text: "Seller" },
    { key: 12347, value: 12347, text: "Manager" }
];

const Render = ({
    openModal,
    user,
    errors,
    onChangeUserInfo,
    onChangeActive,
    onPositive,
    onClose
}) => (
    <ModalModule
        title="Create User"
        open={openModal}
        size="tiny"
        actionDisable={!_.isEqual(initialState.errors, errors)}
        onPositive={onPositive}
        onClose={onClose}
    >
        <Form>
            <Form.Group widths="equal">
                <FormInput
                    required
                    label="First Name: "
                    name="firstName"
                    fluid
                    defaultValue={user.firstName}
                    onChange={onChangeUserInfo}
                    error={errors.firstName}
                />
                <FormInput
                    required
                    label="Middle Name: "
                    name="lastName"
                    fluid
                    defaultValue={user.lastName}
                    onChange={onChangeUserInfo}
                    error={errors.lastName}
                />
                <FormInput
                    required
                    label="Name: "
                    name="name"
                    fluid
                    defaultValue={user.name}
                    onChange={onChangeUserInfo}
                    error={errors.name}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <FormInput
                    required
                    label="Phone: "
                    name="phone"
                    fluid
                    defaultValue={user.phone}
                    onChange={onChangeUserInfo}
                    error={errors.phone}
                />
                <FormInput
                    required
                    label="Email: "
                    name="email"
                    fluid
                    defaultValue={user.email}
                    onChange={onChangeUserInfo}
                    error={errors.email}
                />
            </Form.Group>
            <FormSelect
                label="User Group: "
                required
                defaultValue={user.userGroup}
                name="userGroup"
                options={userGroups}
                onChange={onChangeUserInfo}
            />
            <Form.Checkbox
                label="Active"
                checked={user.status}
                onChange={onChangeActive}
            />
        </Form>
    </ModalModule>
);

const UserModal = ({ onPositive }) => {
    const selector = useSelector(({
        userReducer: { openModal, modalFormSuccessMessage, formLoading, productCategory, errors } 
    }) => ({ openModal, formLoading, modalFormSuccessMessage, productCategory, errors }), shallowEqual)
    
    const [errors, setErrors] = useState({ ...initialState.errors })

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        name: "",
        phone: "",
        email: "",
        userGroup: userGroups[0].value,
        status: true
    });

    const renderProps = {
        ...selector,
        user,
        errors,
        onChangeUserInfo: (_, { name, value }, error) => {
            setUser({ ...user, [name]: value });
            setErrors({ ...errors, [name]: error });
        },
        onChangeActive: (_, checkbox) => setUser({
            ...user,
            status: checkbox.checked
        }),
        onPositive: _ => onPositive(user),
        onClose: _ => dispatch(closeModal())
    };

    return <Render {...renderProps} />;
};

export default UserModal;
