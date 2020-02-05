import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { DEFAULT_STATUS } from '../../../../constants/entites'
// REDUX
import FilterStatus from '../../../molecules/FilterStatus';
import { TableCell } from '@material-ui/core';
import TableModule from '../../../molecules/TableModule';
import StatusLabel from '../../../atoms/StatusLabel';
import { getUpdateAction, doDelete } from '../../../../redux/reducers/promotionReducer';

const listStatus = [
    { key: "", label: "All" },
    { key: "ACTIVE", label: "Active" },
    { key: "HIDDEN", label: "Hidden" },
    { key: "DELETE", label: "Delete" }
]

const headCells = [
    { id: "fullName", label: "Full Name" },
    { id: "phone", label: "Phone" },
    { id: "email", label: "Email" },
    { id: "promotionGroupName", label: "Promotion Group" },
    { id: "status", label: "Status" }
];

const TableRowModule = ({ fullName, phone, email, promotionGroupName, status }) => (
    <>
        <TableCell>{fullName}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{promotionGroupName}</TableCell>
        <TableCell>
            <StatusLabel {...DEFAULT_STATUS[status]} />
        </TableCell>
    </>
)

const Render = ({
    promotionList, loading,
    onOpenUpdate,
    onDelete
}) => (
    <TableModule
        selectKey="promotionId"
        loading={loading}
        headCells={headCells}
        dataSources={promotionList}
        row={TableRowModule}
        onOpenUpdate={onOpenUpdate}
        onDelete={onDelete}
    >
        <FilterStatus listStatus={listStatus} onChangeFilter />
    </TableModule>
)

export default function PromotionTable() {
    const selector = useSelector(({
        promotionReducer: { promotionList, page, totalPage: totalPages, filters, loading } 
    }) => ({ promotionList, loading, page, totalPages, filters }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onOpenUpdate: promotionId => dispatch(getUpdateAction(promotionId)),
        onDelete: promotionId => dispatch(doDelete(promotionId)),
    }

    return <Render {...renderProps} />
}