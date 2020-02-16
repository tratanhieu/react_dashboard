import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import RichText from "components/atoms/RichText";
import Input from "components/atoms/Input";
import ToggleActive from "components/atoms/ToggleActive";
import FormModule from "components/molecules/FormModule";
import SelectSearch from "components/atoms/SelectSearch";
import TagsInput from "components/atoms/TagsInput";
import { closeModal, initForm, doSave, setProduct, onChangeProductCategory, onChangeProductTypeGroup } from 'redux/reducers/productReducer';
import FormGroup from "components/atoms/FormGroup";
import Fieldset from "components/atoms/Fieldset";
import PackageForm from "components/organisms/Product/ProductForm/PackageForm";

const Render = ({
    openModal,
    init,
    formLoading,
    formSuccessMessage,
    productCategoryList,
    productTypeGroupList,
    productTypeList,
    productBrandList,
    productUnitList,
    tagList = [],
    product: { 
        name,
        slugName,
        netWeight,
        packages = [],
        tags = [],
        productCategory,
        productTypeGroup,
        productType,
        productBrand,
        productUnit,
        description,
        content,
        status
    },
    errors: { formErrors },
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
        positiveDisabled={!(name)}
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
                        name="productCategory"
                        label="Product Category"
                        options={productCategoryList}
                        value={productCategory}
                        getOptionLabel={option => option.name}
                        onChange={onChangeForm}
                        error={formErrors.productCategoryId}
                    />
                    <SelectSearch
                        style={{ width: '32%' }}
                        required
                        name="productTypeGroup"
                        label="Product Type Group"
                        options={productTypeGroupList}
                        value={productTypeGroup}
                        getOptionLabel={option => option.name}
                        onChange={onChangeForm}
                        error={formErrors.productTypeGroupId}
                    />
                    <SelectSearch
                        style={{ width: '32%' }}
                        required
                        name="productType"
                        label="Product Type"
                        options={productTypeList}
                        value={productType}
                        getOptionLabel={option => option.name}
                        onChange={onChangeForm}
                        error={formErrors.productTypeId}
                    />
                </FormGroup>
                <FormGroup row>
                    <SelectSearch
                        style={{ width: '48%' }}
                        required
                        name="productBrand"
                        label="Product Brand"
                        options={productBrandList}
                        value={productBrand}
                        getOptionLabel={option => option.name}
                        onChange={onChangeForm}
                        error={formErrors.productBrandId}
                    />
                    <div style={{ width: '48%', display: 'flex', justifyContent: 'space-between' }}>
                        <Input
                            required
                            width="65%"
                            label="Net Weight"
                            margin="dense"
                            name="netWeight"
                            fullWidth
                            value={netWeight}
                            onChange={onChangeForm}
                            error={formErrors.netWeight}
                        />
                        <SelectSearch
                            style={{ width: '32%' }}
                            required
                            name="productUnit"
                            label="Unit"
                            options={productUnitList}
                            value={productUnit}
                            getOptionLabel={option => option.name}
                            onChange={onChangeForm}
                            error={formErrors.productUnitId}
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
        productReducer: {
            formLoading,
            formSuccessMessage,
            product,
            productCategoryList,
            productTypeGroupList,
            productTypeList,
            productBrandList,
            productUnitList,
            errors } 
    }) => ({
        formLoading,
        formSuccessMessage,
        product,
        productCategoryList,
        productTypeGroupList,
        productTypeList,
        productBrandList,
        productUnitList,
        errors
    }), shallowEqual)

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
        onChangeForm: (_, { name, value }) => {
            dispatch(setProduct({ 
                ...selector.product,
                [name]: value
            }))
            if (value && name === 'productCategory') {
                dispatch(onChangeProductCategory(value.productCategoryId))
            }
            if (value && name === 'productTypeGroup') {
                dispatch(onChangeProductTypeGroup(value.productCategoryId, value.productTypeGroupId))
            }
        },
        onChangeContent: content => dispatch(setProduct({ ...selector.product, content })),
        // onPositive: () => dispatch(doSave(selector.product)),
        onChangePackagesForm: packages => dispatch(setProduct({ ...selector.product, packages })),
        onPositive: () => { console.log(selector.product)},
        onClose: () => dispatch(closeModal())
    };

    return <Render {...renderProps} />
}
