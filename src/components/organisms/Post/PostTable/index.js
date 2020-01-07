import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { DEFAULT_STATUS } from '../../../../constants/entites'
import Slug from '../../../atoms/Slug';
import { formatDateTime } from '../../../../commons/utils';
import { TableCell, Chip } from '@material-ui/core';
import TableModule from '../../../molecules/TableModule';
import StatusLabel from '../../../atoms/StatusLabel';

const headCells = [
    { id: "name", label: "Name" },
    { id: "tags", label: "Tags" },
    { id: "postTypeName", label: "Post Type" },
    { id: "createDate", label: "Create Date" },
    { id: "updateDate", label: "Update Date" },
    { id: "status", label: "Create Date" }
];

const TableRowModule = ({ name, slugName, tags, postTypeName, createDate, updateDate, status }) => (
    <>
        <TableCell>
            {name}
            <Slug>{slugName}</Slug>
        </TableCell>
        <TableCell>
            {tags.map((tag, index) => <>
                    {index === 0 ? '' : ', '}
                    <a key={index} href={`tags/${tag.slugName}`}>{tag.name}</a>
                </>
            )}
        </TableCell>
        <TableCell>
            {postTypeName}
        </TableCell>
        <TableCell>{formatDateTime(createDate)}</TableCell>
        <TableCell>{formatDateTime(updateDate)}</TableCell>
        <TableCell>
            <StatusLabel {...DEFAULT_STATUS[status]} />
        </TableCell>
    </>
)

const Render = ({
    postList, loading
}) => (
    <TableModule
        selectKey="postId"
        headCells={headCells}
        dataSources={postList}
        row={TableRowModule}
        onDelete={selected => console.log(selected)}
    />
)

export default function PostTable () {
    const selector = useSelector(({
        postReducer: { postList, loading } 
    }) => ({ postList, loading }), shallowEqual)

    const renderProps = {
        ...selector
    }

    return <Render {...renderProps} />
}