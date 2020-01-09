import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import ModalModule from "../../../molecules/ModalModule";
import FormInput from "../../../atoms/FormInput";
import FormInputSlug from "../../../atoms/FormInputSlug";
import FormSelect from "../../../atoms/FormSelect";
import { closeModal, setPost, doSave } from '../../../../redux/reducers/postReducer'
import _ from "lodash";
import RichText from "../../../atoms/RichText";
import Input from "../../../atoms/Input";
import { TextareaAutosize } from "@material-ui/core";
import ToggleActive from "../../../atoms/ToggleActive";

const Render = ({
    openModal,
    init,
    post: { name, slugName, description, content, status },
    errors,
    onLoaded,
    onChangeForm,
    onPositive,
    onClose
}) => (
    <ModalModule 
        title="Post"
        fullWidth
        maxWidth="lg"
        open={openModal}
        onPositive={onPositive}
        onClose={onClose}
        onLoaded={init}
    >
        <Input
            required
            label="Title"
            margin="dense"
            name="name"
            fullWidth
            defaultValue={name}
            onChange={onChangeForm}
            error={errors.name}
        />
        <Input 
            fullWidth
            required
            margin="dense"
            label="Description"
            multiline
            rows={3}
            name="description"
            defaultValue={description}
            onChange={onChangeForm}
            error={errors.description}
        />
        <RichText label="Content" onLoaded={() => onLoaded()} />
        <ToggleActive
            checked={status}
            onChange={onChangeForm}
        />
    </ModalModule>
);

const PostModal = () => {

    const [init, setInit] = useState(true)

    const selector = useSelector(({
        postReducer: { openModal, formSuccessMessage, formLoading, post, errors } 
    }) => ({ openModal, formLoading, formSuccessMessage, post, errors }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        init,
        ...selector,
        onLoaded: () => setInit(false),
        onChangeForm: (_, { name, value }) => setPost({ 
            ...selector.post,
            [name]: value
        }),
        onPositive: _ => dispatch(doSave(selector.post)),
        onClose: _ => dispatch(closeModal())
    };

    return <Render {...renderProps} />
}

export default PostModal;