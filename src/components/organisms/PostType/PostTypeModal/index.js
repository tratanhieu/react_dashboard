import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Form } from "semantic-ui-react";
import FormInput from "../../../atoms/FormInput";
import FormSelect from "../../../atoms/FormSelect";
import { initialState, closeModal } from '../../../../redux/reducers/postTypeReducer'
import _ from "lodash";
import FormInputSlug from "../../../atoms/FormInputSlug";
import { ACTIVE } from "../../../../constants/entites";
import { formErrorsHandle, isFormError } from "../../../../commons/utils";
import ToggleActive from "../../../atoms/ToggleActive";
import ModalModule from "../../../molecules/ModalModule";

const Render = ({
    openModal,
    postType: { name, slugName, status },
    errors,
    onChangePostTypeInfo,
    onChangeStatus,
    onPositive,
    onClose
}) => (
    <ModalModule
        title="Create Post Type"
        open={openModal}
        size="mini"
        actionDisable={isFormError(errors) || !name}
        onPositive={onPositive}
        onClose={onClose}
    >
        <Form>
            <FormInputSlug
                required
                label="Name: "
                name="name"
                fluid
                defaultValue={name}
                onChange={onChangePostTypeInfo}
                error={errors.name}
            />
            <ToggleActive
                label="Status"
                checked={status}
                onChange={onChangeStatus}
            />
        </Form>
    </ModalModule>
);

const PostTypeModal = ({ onPositive }) => {
    const selector = useSelector(({
        postTypeReducer: { openModal, modalFormSuccessMessage, formLoading, productCategory, errors } 
    }) => ({ openModal, formLoading, modalFormSuccessMessage, productCategory, errors }), shallowEqual)
    
    const [errors, setErrors] = useState({ ...initialState.errors })

    const dispatch = useDispatch()

    const [postType, setPostType] = useState({
        name: "",
        slugName: "",
        status: true
    });

    const renderProps = {
        ...selector,
        postType,
        errors,
        onChangePostTypeInfo: (_, { name, value }, error) => {
            console.log(errors)
            setPostType({ ...postType, [name]: value });
            setErrors({ ...formErrorsHandle(errors, name, error) });
        },
        onChangeStatus: (_, checkbox) => setPostType({
            ...postType,
            status: checkbox.checked
        }),
        onPositive: _ => { console.log(postType) },
        onClose: _ => dispatch(closeModal())
    };

    return <Render {...renderProps} />;
};

export default PostTypeModal;
