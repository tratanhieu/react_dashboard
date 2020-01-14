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
import { TextareaAutosize, FormGroup } from "@material-ui/core";
import ToggleActive from "../../../atoms/ToggleActive";
import FormModule from "../../../molecules/FormModule";
import SelectSearch from "../../../atoms/SelectSearch";
import TagsInput from "../../../atoms/TagsInput";
import ImageUpload from "../../../atoms/ImageUpload";

const Render = ({
    openModal,
    init,
    postTypeList,
    post: { name, slugName, image, description, content, status },
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '49%' }}>
                <ImageUpload
                    source={image}
                    onChange={value => onChangeForm(_, { name: 'image', value })}
                />
            </div>
            <div style={{ width: '49%' }}>
                <SelectSearch
                    label="Post Type"
                    options={postTypeList}
                    getOptionLabel={option => option.title}
                    onChange={e => console.log(e)}
                />
            </div>
        </div>
        <TagsInput
            label="Tags"
            options={postTypeList}
            getOptionLabel={option => option.title}
            onChange={e => console.log(e)}
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
        postReducer: { openModal, formSuccessMessage, postTypeList, formLoading, post, errors } 
    }) => ({ openModal, formLoading, formSuccessMessage, postTypeList, post, errors }), shallowEqual)

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
