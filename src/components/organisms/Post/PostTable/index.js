import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { DEFAULT_STATUS } from '../../../../constants/entites'
import Slug from '../../../atoms/Slug';
import { formatDateTime } from '../../../../commons/utils';
import { TableCell } from '@material-ui/core';
import TableModule from '../../../molecules/TableModule';
import StatusLabel from '../../../atoms/StatusLabel';
import Image from '../../../atoms/Image';

const headCells = [
    { id: "name", label: "Name" },
    { id: "image", label: "Image" },
    { id: "tags", label: "Tags" },
    { id: "postTypeName", label: "Post Type" },
    { id: "updateDate", label: "Update Date" },
    { id: "status", label: "Create Date" }
];

const TableRowModule = ({ postId, name, slugName, image, tags, postTypeName, createDate, updateDate, status, onView }) => (
    <>
        <TableCell width={500}>
            <span onClick={() => onView(postId)}>{name}</span>
            <Slug>{slugName}</Slug>
        </TableCell>
        <TableCell width={120}>
            <Image src={image} alt={slugName} />
        </TableCell>
        <TableCell width={69}>
            {tags.map((tag, index) => <>
                    {index === 0 ? '' : ', '}
                    <a key={index} href={`tags/${tag.slugName}`}>{tag.name}</a>
                </>
            )}
        </TableCell>
        <TableCell width={160}>
            {postTypeName}
        </TableCell>
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
        onView={postId => alert(postId)}
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