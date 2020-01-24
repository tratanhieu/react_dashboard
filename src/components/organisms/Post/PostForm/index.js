import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { closeModal, setPost, doSave } from '../../../../redux/reducers/postReducer'
import _ from "lodash";
import RichText from "../../../atoms/RichText";
import Input from "../../../atoms/Input";
import { FormGroup } from "@material-ui/core";
import ToggleActive from "../../../atoms/ToggleActive";
import FormModule from "../../../molecules/FormModule";
import SelectSearch from "../../../atoms/SelectSearch";
import TagsInput from "../../../atoms/TagsInput";
import ImageUpload from "../../../atoms/ImageUpload";
import DatePicker from "../../../atoms/DatePicker";
import CheckBox from "../../../atoms/CheckBox";

const Render = ({
    openModal,
    init,
    formSuccessMessage,
    showPublishDate,
    postTypeList,
    post: { name, slugName, publishDate, image, tags = [], description, content, status },
    errors: { formErrors },
    setShowPublishDate,
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
        modalSuccess={formSuccessMessage}
        open={openModal}
        onPositive={onPositive}
        onClose={onClose}
        onLoaded={init}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ImageUpload
                source={image}
                onChange={value => onChangeForm(_, { name: 'image', value })}
                error={formErrors.image}
            />
            <div style={{ width: 'calc(100% - 320px - 48px)' }}>
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
                <FormGroup row>
                    <SelectSearch
                        style={{ width: '50%' }}
                        required
                        label="Post Type"
                        options={postTypeList}
                        getOptionLabel={option => option.title}
                        onChange={e => console.log(e)}
                        error={formErrors.name}
                    />
                    <div style={{ 
                        display: 'flex', 
                        marginLeft: '8px',
                        backgroundColor: showPublishDate ? 'rgba(63, 81, 181, 0.08)' : '#fff',
                        padding: '0px 8px',
                        paddingLeft: '16px'
                    }}>
                        <CheckBox
                            label={!showPublishDate ? 'Set Publish Date' : ''}
                            checked={showPublishDate}
                            onChange={event => setShowPublishDate(event.target.checked)}
                        />
                        {showPublishDate && <DatePicker
                            style={{ display: 'block', width: '220px'}}
                            type="date-time"
                            label="Publish Date"
                            name="publishDate"
                            value={publishDate}
                            onChange={onChangeForm}
                        />}
                    </div>
                </FormGroup>
                <TagsInput
                    label="Tags"
                    value={tags}
                    onChange={onChangeForm}
                />
            </div>
        </div>
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
            error={formErrors.content}
        />
        <ToggleActive
            checked={status}
            onChange={onChangeForm}
        />
    </FormModule>
);

export default function PostForm() {
    const [init, setInit] = useState(true)
    const [showPublishDate, setShowPublishDate] = useState(false)

    const selector = useSelector(({
        postReducer: { openModal, formSuccessMessage, postTypeList, formLoading, post, errors } 
    }) => ({ openModal, formLoading, formSuccessMessage, postTypeList, post, errors }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        init,
        showPublishDate,
        ...selector,
        setShowPublishDate,
        onLoaded: () => setInit(false),
        onChangeForm: (_, { name, value }) => dispatch(setPost({ 
            ...selector.post,
            [name]: value
        })),
        onChangeContent: content => dispatch(setPost({ ...selector.post, content })),
        onPositive: () => {
            const publishDate = showPublishDate ? selector.post.showPublishDate : undefined
            dispatch(doSave({
                ...selector.post,
                publishDate
            }))
        },
        onClose: _ => dispatch(closeModal())
    };

    return <Render {...renderProps} />
}
