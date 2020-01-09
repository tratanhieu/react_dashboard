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
import FormModule from "../../../molecules/FormModule";

const Render = ({
    openModal,
    init,
    post: { name, slugName, description, content, status },
    errors: { formErrors },
    onLoaded,
    onChangeForm,
    onChangeContent,
    onPositive,
    onClose
}) => (
    <FormModule 
        title="Create Post"
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
            value={name}
            onChange={onChangeForm}
            error={formErrors.name}
        />
        <Input 
            fullWidth
            required
            margin="dense"
            label="Description"
            multiline
            rows={3}
            name="description"
            value={description}
            onChange={onChangeForm}
            error={formErrors.description}
        />
        <RichText
            label="Content"
            initialValue={content}
            value={content}
            onLoaded={() => onLoaded()} 
            onEditorChange={onChangeContent}
        />
        <ToggleActive
            checked={status}
            onChange={onChangeForm}
        />
    </FormModule>
);

export default function PostForm() {
    const [init, setInit] = useState(true)

    const selector = useSelector(({
        postReducer: { openModal, formSuccessMessage, formLoading, post, errors } 
    }) => ({ openModal, formLoading, formSuccessMessage, post, errors }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        init,
        ...selector,
        onLoaded: () => setInit(false),
        onChangeForm: (_, { name, value }) => dispatch(setPost({ 
            ...selector.post,
            [name]: value
        })),
        onChangeContent: content => dispatch(setPost({ ...selector.post, content })),
        // onPositive: _ => dispatch(doSave(selector.post)),
        onPositive: _ => console.log(selector.post),
        onClose: _ => dispatch(closeModal())
    };

    return <Render {...renderProps} />
}
