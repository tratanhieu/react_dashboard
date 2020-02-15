import React, { useState } from 'react'
import { Table, TableRow, TableCell, TableBody, TableHead } from "@material-ui/core";
import PackageTableRow from 'components/organisms/Product/ProductForm/PackageForm/PackageTableRow';
import Button from 'components/atoms/Button';

const Render = ({
    isOpenCreate,
    createPackageFormData,
    packagesProps,
    setOpenCreate,
    onOpenCreate,
    onCreate,
    onUpdate,
    onRemove
}) => (
    <Table size="small" stickyHeader style={{ marginTop: '8px', marginBottom: '8px' }}>
        <TableHead>
            <TableRow>
                <TableCell align="center">No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Images</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>
                    <Button content="Add" onClick={onOpenCreate} />
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {packagesProps.map((packageItem, key) => 
                <PackageTableRow
                    key={key}
                    index={key}
                    data={packageItem}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                />
            )}
            {isOpenCreate && <PackageTableRow
                isCreateForm={isOpenCreate}
                index={packagesProps.length}
                data={createPackageFormData}
                onCreate={onCreate}
                onCancelCreate={() => setOpenCreate(false)}
            />}
        </TableBody>
    </Table>
)

export default function PackageForm({ packages: packagesProps, onChange }) {
    const [isOpenCreate, setOpenCreate] = useState(false)
    const [createPackageFormData, setCreatePackageFormData] = useState({})

    const renderProps = {
        isOpenCreate,
        createPackageFormData,
        packagesProps,
        setOpenCreate,
        onOpenCreate: () => {
            setOpenCreate(true)
            setCreatePackageFormData({})
        },
        onCreate: createPackageFormData => {
            packagesProps.push({ ...createPackageFormData })
            onChange([...packagesProps])
            setOpenCreate(false)
            setCreatePackageFormData({})
        },
        onUpdate: (index, packageRow, callback) => {
            packagesProps[index] = { ...packageRow }
            onChange([...packagesProps])
            callback(false)
        },
        onRemove: index => {
            packagesProps.splice(index, 1)
            onChange([...packagesProps])
        }
    }

    return <Render {...renderProps} />
}