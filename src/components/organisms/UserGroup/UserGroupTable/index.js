import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Label } from 'semantic-ui-react'

import { DEFAULT_STATUS } from '../../../../constants/entites'
import { formatDateTime } from '../../../../commons/utils';
import StatusLabel from '../../../atoms/StatusLabel';
import FilterStatus from '../../../molecules/FilterStatus';
import { TableCell } from '@material-ui/core';
import TableModule from '../../../molecules/TableModule';
// REDUX

const listStatus = [
    { key: "", label: "All" },
    { key: "ACTIVE", label: "Active" },
    { key: "HIDDEN", label: "Hidden" },
    { key: "DELETE", label: "Delete" }
]

const headCells = [
    { id: "name", label: "Full Name" },
    { id: "totalUser", label: "Total User" },
    { id: "createDate", label: "Create Date" },
    { id: "updateDate", label: "Update Date" },
    { id: "status", label: "Status" }
];

const TableRowModule = ({ name, userInGroup, createDate, updateDate, status }) => (
    <>
        <TableCell>{name}</TableCell>
        <TableCell>{userInGroup}</TableCell>
        <TableCell>{formatDateTime(createDate)}</TableCell>
        <TableCell>{formatDateTime(updateDate)}</TableCell>
        <TableCell>
            <StatusLabel {...DEFAULT_STATUS[status]} />
        </TableCell>
    </>
)

const Render = ({
    userGroupList, loading
}) => (
    <TableModule
        selectKey="userGroupId"
        headCells={headCells}
        dataSources={userGroupList}
        row={TableRowModule}
        onDelete={selected => console.log(selected)}
        >
        <FilterStatus listStatus={listStatus} onChangeFilter />
    </TableModule>
)

const UserGroupTable = () => {
    // const selector = useSelector(({
    //     productCategoryReducer: { productCategoryList, page, totalPage: totalPages, filters, loading } 
    // }) => ({ productCategoryList, loading, page, totalPages, filters }), shallowEqual)

    const selector = {
        userGroupList: [
            { 
                userGroupId: 1,
                name: "Administrator",
                userInGroup: 1,
                createDate: new Date(),
                updateDate: new Date(),
                status: "ACTIVE" 
            },
            { 
                userGroupId: 1,
                name: "Manager",
                userInGroup: 2,
                createDate: new Date(),
                updateDate: new Date(),
                status: "ACTIVE" 
            },
            { 
                userGroupId: 1,
                name: "Seller",
                userInGroup: 10,
                createDate: new Date(),
                updateDate: new Date(),
                status: "ACTIVE" 
            }
        ],
        loading: false,
        totalPages: 2,
        filters: {}
    }

    const renderProps = {
        ...selector
    }

    return <Render {...renderProps} />
}

export default UserGroupTable