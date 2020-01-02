import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
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
import { setCheckedItems, fetchWithPaginationAndFilter } from '../../../../redux/reducers/userReducer';
import Slug from '../../../atoms/Slug';

const headCells = [
    { id: "name", label: "Name" },
    { id: "total", label: "Total" },
    { id: "createDate", label: "Create Date" },
    { id: "updateDate", label: "Update Date" },
    { id: "status", label: "Create Date" }
];

const TableRowModule = ({ name, slugName, total, createDate, updateDate, status }) => (
    <>
        <TableCell>
            {name}
            <Slug>{slugName}</Slug>
        </TableCell>
        <TableCell>{total}</TableCell>
        <TableCell>{formatDateTime(createDate)}</TableCell>
        <TableCell>{formatDateTime(updateDate)}</TableCell>
        <TableCell>
            <Label color={DEFAULT_STATUS[status].color}>
                {DEFAULT_STATUS[status].text}
            </Label>
        </TableCell>
    </>
);

const Render = ({
    postTypeList, loading, totalPages, defaultActivePage, checkAllItem,
    onChange, onDelete, onChangePage, onCheckItem, onCheckAllItem
}) => {

    return (
        <TableModule
            selectKey="postTypeId"
            headCells={headCells}
            dataSources={postTypeList}
            row={TableRowModule}
            onDelete={selected => console.log(selected)}
        />
    )
}

const UserTable = () => {
    // const selector = useSelector(({
    //     productCategoryReducer: { productCategoryList, page, totalPage: totalPages, filters, loading } 
    // }) => ({ productCategoryList, loading, page, totalPages, filters }), shallowEqual)

    const selector = {
        postTypeList: [
            { 
                postTypeId: 10,
                name: "Hai vui vẻ",
                slugName: "hai-vui-ve-ko-quau",
                total: 10,
                status: "ACTIVE" 
            },
            { 
                postTypeId: 12,
                name: "Bạn tên gì?",
                slugName: "ban-ten-gi-vay",
                total: 21,
                status: "ACTIVE" 
            }
        ],
        loading: false,
        totalPages: 2,
        filters: {}
    }

    const [state, setState] = useState({
        checkAllItem: false,
        dataSources: []
    });

    const dispatch = useDispatch();

    // useEffect(() => {
    //     setState({
    //         ...state,
    //         checkAllItem: false,
    //         dataSources: selector.userList.map(item => ({
    //             ...item,
    //             checked: false
    //         }))
    //     })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selector.postTypeList])

    // useEffect(() => {
    //     dispatch(fetchWithPaginationAndFilter(selector.filters, 1))
    // }, [selector.filters])

    const renderProps = {
        ...state,
        ...selector,
        defaultActivePage: selector.page,
        onChangePage: page => dispatch(fetchWithPaginationAndFilter(selector.filters, page)),
        onCheckItem: (index, checked) => {
            const checkedItems = [];
            state.dataSources[index].checked = checked;
            state.dataSources.forEach(item =>
                item.checked === true ? checkedItems.push(item.product_category_id) : null
            );
            state.checkAllItem = checkedItems.length === state.dataSources.length
            setState({ ...state })
            dispatch(setCheckedItems(checkedItems))
        },
        onCheckAllItem: checkAllItem => {
            const checkedItems = [];
            setState({
                ...state,
                checkAllItem,
                dataSources: state.dataSources.map(item => {
                    if (checkAllItem) {
                        checkedItems.push(item.product_category_id);
                    }
                    return {
                        ...item,
                        checked: item.checked !== checkAllItem ? checkAllItem : item.checked
                    };
                })
            });
            dispatch(setCheckedItems(checkedItems))
        }
    }

    return <Render {...renderProps} />
}

export default UserTable