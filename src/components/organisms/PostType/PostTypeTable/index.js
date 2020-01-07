import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Label } from 'semantic-ui-react'
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableModule from "../../../molecules/TableModule";
// import {
//     TableModule,
//     TableRow,
//     TableCell,
//     TableHeaderCell,
//     calcCellWidth
// } from "../../../atoms/TableModule";

import { DEFAULT_STATUS } from '../../../../constants/entites'
import { formatDateTime } from '../../../../commons/utils'
// REDUX
import Slug from '../../../atoms/Slug';
import { Chip } from '@material-ui/core';
import FilterBar from '../../../molecules/FilterBar';
import StatusLabel from '../../../atoms/StatusLabel';

const headCells = [
    { id: "name", label: "Name" },
    { id: "total", label: "Total" },
    { id: "createDate", label: "Create Date" },
    { id: "updateDate", label: "Update Date" },
    { id: "status", label: "Create Date" }
];

const TableRowModule = ({ name, slugName, totalPost, createDate, updateDate, status }) => (
    <>
        <TableCell>
            {name}
            <Slug>{slugName}</Slug>
        </TableCell>
        <TableCell>{totalPost}</TableCell>
        <TableCell>{formatDateTime(createDate)}</TableCell>
        <TableCell>{formatDateTime(updateDate)}</TableCell>
        <TableCell>
            <StatusLabel {...DEFAULT_STATUS[status]} />
        </TableCell>
    </>
)

const listStatus = [
    { key: "", label: "All" },
    { key: "ACTIVE", label: "Active" },
    { key: "HIDDEN", label: "Hidden" },
    { key: "DELETE", label: "Delete" }
]

const Render = ({
    postTypeList, loading
}) => (
    <TableModule
        selectKey="postTypeId"
        headCells={headCells}
        dataSources={postTypeList}
        row={TableRowModule}
        onDelete={selected => console.log(selected)}
    >
        <FilterBar listStatus={listStatus} onChangeFilter />
    </TableModule>
)

export default function PostTypeTable() {
    const selector = useSelector(({
        postTypeReducer: { postTypeList, loading } 
    }) => ({ postTypeList, loading }), shallowEqual)

    const renderProps = {
        ...selector
    }

    return <Render {...renderProps} />
}