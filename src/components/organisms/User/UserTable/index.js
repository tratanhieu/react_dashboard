import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Label } from 'semantic-ui-react'

import { DEFAULT_STATUS } from '../../../../constants/entites'
// REDUX
import { fetchAll } from '../../../../redux/reducers/userReducer';
import FilterStatus from '../../../molecules/FilterStatus';
import { TableCell, Chip } from '@material-ui/core';
import TableModule from '../../../molecules/TableModule';
import StatusLabel from '../../../atoms/StatusLabel';

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
    { id: "userGroupName", label: "User Group" },
    { id: "status", label: "Status" }
];

const TableRowModule = ({ fullName, phone, email, userGroupName, status }) => (
    <>
        <TableCell>{fullName}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{userGroupName}</TableCell>
        <TableCell>
            <StatusLabel {...DEFAULT_STATUS[status]} />
        </TableCell>
    </>
)

const Render = ({
    userList, loading
}) => (
    <TableModule
        selectKey="userId"
        headCells={headCells}
        dataSources={userList}
        row={TableRowModule}
        onDelete={selected => console.log(selected)}
    >
        <FilterStatus listStatus={listStatus} onChangeFilter />
    </TableModule>
)

export default function UserTable() {
    // const selector = useSelector(({
    //     productCategoryReducer: { productCategoryList, page, totalPage: totalPages, filters, loading } 
    // }) => ({ productCategoryList, loading, page, totalPages, filters }), shallowEqual)

    const selector = {
        userList: [
            { 
                userId: 10,
                fullName: "Tran Van Anh",
                phone: 123456,
                email: "sjhdj@gmail.com",
                userGroupName: "ADMIN",
                status: "ACTIVE" 
            }
        ],
        loading: false
    }

    const renderProps = {
        ...selector
    }

    return <Render {...renderProps} />
}