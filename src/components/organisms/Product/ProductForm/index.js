import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import RichText from "components/atoms/RichText";
import Input from "components/atoms/Input";
import ToggleActive from "components/atoms/ToggleActive";
import FormModule from "components/molecules/FormModule";
import SelectSearch from "components/atoms/SelectSearch";
import TagsInput from "components/atoms/TagsInput";
import { closeModal, initForm, doSave, setProduct } from 'redux/reducers/productReducer';
import FormGroup from "components/atoms/FormGroup";
import Fieldset from "components/atoms/Fieldset";
import PackageForm from "components/organisms/Product/ProductForm/PackageForm";

const Render = ({
    openModal,
    init,
    formLoading,
    formSuccessMessage,
    showPublishDate,
    postTypeList,
    tagList = [],
    product: { name, slugName, publishDate, image, packages = [], tags = [], postType, description, content, status },
    errors: { formErrors },
    setShowPublishDate,
    onLoaded,
    onChangeForm,
    onChangeContent,
    onChangePackagesForm,
    onPositive,
    onClose
}) => (
    <FormModule 
        title="Create Product"
        loading={formLoading}
        positiveDisabled={!(name && description && content && postType && description && image)}
        formSuccess={formSuccessMessage}
        open={openModal}
        onPositive={onPositive}
        onClose={onClose}
        onLoaded={init}
    >
        <Fieldset title="Basic Product Infomation">
            <div style={{ width: '100%' }}>
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
                        style={{ width: '32%' }}
                        required
                        label="Product Category"
                        options={postTypeList}
                        value={postType}
                        getOptionLabel={option => option.name}
                        onChange={(_, value) => onChangeForm(_, { name: 'postType', value: value })}
                        error={formErrors.postTypeId}
                    />
                    <SelectSearch
                        style={{ width: '32%' }}
                        required
                        label="Product Group Type"
                        options={postTypeList}
                        value={postType}
                        getOptionLabel={option => option.name}
                        onChange={(_, value) => onChangeForm(_, { name: 'postType', value: value })}
                        error={formErrors.postTypeId}
                    />
                    <SelectSearch
                        style={{ width: '32%' }}
                        required
                        label="Product Type"
                        options={postTypeList}
                        value={postType}
                        getOptionLabel={option => option.name}
                        onChange={(_, value) => onChangeForm(_, { name: 'postType', value: value })}
                        error={formErrors.postTypeId}
                    />
                </FormGroup>
                <FormGroup row>
                    <SelectSearch
                        style={{ width: '48%' }}
                        required
                        label="Product Brand"
                        options={postTypeList}
                        value={postType}
                        getOptionLabel={option => option.name}
                        onChange={(_, value) => onChangeForm(_, { name: 'postType', value: value })}
                        error={formErrors.postTypeId}
                    />
                    <div style={{ width: '48%', display: 'flex', justifyContent: 'space-between' }}>
                        <Input
                            required
                            width="65%"
                            label="Net Weight"
                            margin="dense"
                            name="netWeight"
                            fullWidth
                            value={name}
                            onChange={onChangeForm}
                            error={formErrors.name}
                        />
                        <SelectSearch
                            style={{ width: '32%' }}
                            required
                            label="Unit"
                            options={postTypeList}
                            value={postType}
                            getOptionLabel={option => option.name}
                            onChange={(_, value) => onChangeForm(_, { name: 'postType', value: value })}
                            error={formErrors.postTypeId}
                        />
                    </div>
                </FormGroup>
                {tagList.length > 0 && <TagsInput
                    label="Tags"
                    value={tags}
                    rows={2}
                    source={tagList}
                    onChange={onChangeForm}
                />}
            </div>
        </Fieldset>
        <Fieldset title="Package">
            <PackageForm packages={packages} onChange={onChangePackagesForm} />
        </Fieldset>
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
)

export default function ProductForm() {
    const [init, setInit] = useState(true)

    const selector = useSelector(({
        productReducer: { formSuccessMessage, formLoading, product, errors } 
    }) => ({ formLoading, formSuccessMessage, product, errors }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initForm())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(selector.product)
    }, [selector.product])

    const renderProps = {
        init,
        ...selector,
        onLoaded: () => setInit(false),
        onChangeForm: (_, { name, value }) => dispatch(setProduct({ 
            ...selector.product,
            [name]: value
        })),
        onChangeContent: content => dispatch(setProduct({ ...selector.product, content })),
        // onPositive: () => dispatch(doSave(selector.product)),
        onChangePackagesForm: packages => dispatch(setProduct({ ...selector.product, packages })),
        onPositive: () => { console.log(selector.product)},
        onClose: () => dispatch(closeModal())
    };

    return <Render {...renderProps} />
}
