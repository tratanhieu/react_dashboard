import React, { useState } from 'react'
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import { CheckCircle, RemoveCircle, EditOutlined } from '@material-ui/icons';
import ImageUploads from 'components/atoms/ImageUploads';
import Input from 'components/atoms/Input';

const Render = ({
    isEditable = false,
    index,
    packageState: { packageName, packageQuantity, images, status },
    setEditble,
    onChangeForm,
    onSave,
    onCancel
}) => (
    <TableRow>
        <TableCell width={30} align="center">{index + 1}</TableCell>
        <TableCell width={300}>
            {isEditable ?
            <Input
                name="packageName"
                value={packageName}
                onChange={onChangeForm}
            /> : packageName}
        </TableCell>
        <TableCell width={100}>
            {isEditable ? 
            <Input
                name="packageQuantity"
                value={packageQuantity}
                onChange={onChangeForm}
            /> : packageQuantity}
        </TableCell>
        <TableCell width={360}>
            <ImageUploads
                name="images"
                max={5}
                onlyView={!isEditable}
                dataSources={images}
                onChange={onChangeForm}
            />
        </TableCell>
        <TableCell>
            {isEditable ? <Input value={status} /> : status}
        </TableCell>
        <TableCell width={100}>
            <IconButton size="small">
                {isEditable ? <CheckCircle onClick={() => onSave(index)} /> : <EditOutlined onClick={() => setEditble(true)}/>}
            </IconButton>
            <IconButton size="small">
                <RemoveCircle onClick={onCancel} />
            </IconButton>
        </TableCell>
    </TableRow>
)

export default function PackageTableRow({
    isCreateForm = false,
    data = {},
    onCreate,
    onUpdate,
    onRemove,
    onCancelCreate,
    ...rest
}) {
    const [packageState, setPackageState] = useState(data)
    const [isEditable, setEditble] = useState(isCreateForm)

    const renderProps = {
        ...rest,
        isEditable,
        packageState,
        setEditble,
        onChangeForm: (_, { name, value }) => setPackageState({
            ...packageState,
            [name]: value
        }),
        onSave: index => isCreateForm ? 
            onCreate(packageState) :
            onUpdate(index, packageState, isEdit => setEditble(isEdit)),
        onCancel: () => isCreateForm ? onCancelCreate() : () => {
            setPackageState({ ...data })
            setEditble(false)
        }
    }

    return <Render {...renderProps} />
}