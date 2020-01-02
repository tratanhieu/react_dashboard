import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Form } from "semantic-ui-react";
import ModalModule from "../../../atoms/ModalModule";
import FormInput from "../../../atoms/FormInput";
import FormInputSlug from "../../../atoms/FormInputSlug";
import FormSelect from "../../../atoms/FormSelect";
import { initialState, closeModal } from '../../../../redux/reducers/postReducer'
import _ from "lodash";
import RichText from "../../../atoms/RichText";

const userGroups = [
    { key: 12345, value: 12345, text: "Administrator" },
    { key: 12346, value: 12346, text: "Seller" },
    { key: 12347, value: 12347, text: "Manager" }
];

const Render = ({
    form: { name, slugName, status },
    user,
    errors,
    onChangeUserInfo,
    onChangeActive,
    onPositive,
    onClose
}) => (
    <Form>
        <FormInputSlug
            required
            label="Title: "
            name="title"
            fluid
            defaultValue={name}
            onChange={onChangeUserInfo}
            error={errors.firstName}
        />
        <RichText label="Description" height={200} />
        <RichText label="Content" />
        {/* <FormSelect
            label="Post Type: "
            required
            defaultValue={}
            name="postType"
            options={userGroups}
            onChange={onChangeUserInfo}
        /> */}
        <Form.Checkbox
            label="Active"
            checked={status}
            onChange={onChangeActive}
        />
    </Form>
);

const PostForm = ({ onPositive }) => {
    const selector = useSelector(({
        postReducer: { openForm, modalFormSuccessMessage, formLoading, productCategory, errors } 
    }) => ({ openForm, formLoading, modalFormSuccessMessage, productCategory, errors }), shallowEqual)
    
    const [errors, setErrors] = useState({ ...initialState.errors })

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        status: true
    });

    const renderProps = {
        form,
        ...selector,
        onPositive: _ => onPositive(form),
        onClose: _ => dispatch(closeModal())
    };

    return <Render {...renderProps} />
}

export default PostForm;
