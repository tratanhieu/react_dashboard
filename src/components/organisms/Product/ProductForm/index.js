import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import RichText from "components/atoms/RichText";
import Input from "components/atoms/Input";
import ToggleActive from "components/atoms/ToggleActive";
import FormModule from "components/molecules/FormModule";
import SelectSearch from "components/atoms/SelectSearch";
import TagsInput from "components/atoms/TagsInput";
import ImageUpload from "components/atoms/ImageUpload";
import DatePicker from "components/atoms/DatePicker";
import CheckBox from "components/atoms/CheckBox";
import { closeModal, initForm, doSave, setProduct } from 'redux/reducers/productReducer';
import FormGroup from "components/atoms/FormGroup";
import Fieldset from "components/atoms/Fieldset";
import { Table, TableRow, TableCell, TableBody, TableHead } from "@material-ui/core";
import Button from "components/atoms/Button";
import ImageUploads from "components/atoms/ImageUploads";

const options = [
    { key: "1", text: "Car", value: "car" },
    { key: "2", text: "Bike", value: "bike" },
    { key: "3", text: "Other", value: "other" }
];

const Render = ({
    openModal,
    init,
    formLoading,
    formSuccessMessage,
    showPublishDate,
    postTypeList,
    tagList = [],
    product: { name, slugName, publishDate, image, images = [], tags = [], postType, description, content, status },
    errors: { formErrors },
    setShowPublishDate,
    onLoaded,
    onChangeForm,
    onChangeContent,
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
            <Table size="small" stickyHeader style={{ marginTop: '8px', marginBottom: '8px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Images</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Lốc</TableCell>
                        <TableCell>6 Lon</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Thùng</TableCell>
                        <TableCell>24 Lon</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>
                            <Input />
                        </TableCell>
                        <TableCell>
                            <Input />
                        </TableCell>
                        <TableCell>
                            <ImageUploads
                                name="images"
                                dataSources={images}
                                onChange={onChangeForm}
                            />
                        </TableCell>
                        <TableCell>
                            <Button content="Edit" />
                            <Button content="Delete" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
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
        onPositive: () => { console.log(selector.product)},
        onClose: () => dispatch(closeModal())
    };

    return <Render {...renderProps} />
}
