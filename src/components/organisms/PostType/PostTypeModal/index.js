import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Form } from "semantic-ui-react";
import FormInput from "../../../atoms/FormInput";
import FormSelect from "../../../atoms/FormSelect";
import { setPostType, doSave, closeModal } from '../../../../redux/reducers/postTypeReducer'
import _ from "lodash";
import FormInputSlug from "../../../atoms/FormInputSlug";
import { ACTIVE } from "../../../../constants/entites";
import { formErrorsHandle, isFormError } from "../../../../commons/utils";
import ToggleActive from "../../../atoms/ToggleActive";
import ModalModule from "../../../molecules/ModalModule";
import Input from "../../../atoms/Input";

const Render = ({
    openModal,
    formLoading,
    modalFormSuccessMessage = '',
    postType: { name, slugName, status },
    errors,
    onChangeForm,
    onPositive,
    onClose
}) => (
    <ModalModule
        title="Create Post Type"
        open={openModal}
        loading={formLoading}
        positiveDisabled={!name}
        modalSuccess={modalFormSuccessMessage}
        onPositive={onPositive}
        onClose={onClose}
    >
        <Form>
            <Input
                label="Name"
                required
                autoFocus
                name="name"
                onChange={onChangeForm}
                value={name}
                error={errors.name}
            />
            <ToggleActive
                label="Status"
                checked={status}
                onChange={onChangeForm}
            />
        </Form>
    </ModalModule>
);

export default function PostTypeModal() {
    const selector = useSelector(({
        postTypeReducer: { openModal, modalFormSuccessMessage, formLoading, postType, errors } 
    }) => ({ openModal, formLoading, modalFormSuccessMessage, postType, errors }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onChangeForm: (_, { name, value }) => dispatch(setPostType({ 
            ...selector.postType, [name]: value 
        })),
        onPositive: _ => dispatch(doSave(selector.postType)),
        onClose: _ => dispatch(closeModal())
    };

    return <Render {...renderProps} />;
}
