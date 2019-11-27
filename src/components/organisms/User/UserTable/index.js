import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Label } from 'semantic-ui-react'

import {
    TableModule,
    TableRow,
    TableCell,
    TableHeaderCell,
    calcCellWidth
} from "../../../atoms/TableModule";

import { DEFAULT_STATUS } from '../../../../constants/entites'
// REDUX
import { setCheckedItems, fetchWithPaginationAndFilter } from '../../../../redux/reducers/productCategoryReducer';

const Render = ({
    dataSources, loading, totalPages, defaultActivePage, checkAllItem,
    onChange, onDelete, onChangePage, onCheckItem, onCheckAllItem
}) => {
    const cellWidth = calcCellWidth([30, 20, 20, 20, 10], true)

    const TableHeader = () => (
        <>
            <TableHeaderCell width={cellWidth[0]}>
                Fullname
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[1]}>
                Phone
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[2]}>
                Email
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[3]}>
                User Group
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[4]} textAlign="center">
                Status
            </TableHeaderCell>
        </>
    )

    return (
        <TableModule
            loading={loading}
            showCheckbox 
            header={<TableHeader />} 
            paginationColspan={4}
            currentItems={dataSources.length}
            totalPages={totalPages}
            defaultActivePage={defaultActivePage}
            checkAllItem={checkAllItem}
            onCheckAllItem={checked => onCheckAllItem(checked)}
            onChangePage={onChangePage}
        >
        {
            dataSources.map((item, index) => (
                <TableRow
                    key={index}
                    showCheckbox
                    checked={item.checked}
                    onCheckItem={checked => onCheckItem(index, checked)}
                    onChange={_ => onChange(item.id)}
                    onDelete={onDelete}
                >
                    <TableCell width={cellWidth[0]}>
                        {`${item.first_name} ${item.last_name} ${item.name}`}
                    </TableCell>
                    <TableCell width={cellWidth[1]}>
                        {item.phone}
                    </TableCell>
                    <TableCell width={cellWidth[2]}>
                        {item.email}
                    </TableCell>
                    <TableCell width={cellWidth[3]}>
                        {item.user_group}
                    </TableCell>
                    <TableCell width={cellWidth[4]} textAlign="center">
                        <Label color={DEFAULT_STATUS[item.status].color}>
                            {DEFAULT_STATUS[item.status].text}
                        </Label>
                    </TableCell>
                </TableRow>
            ))
        }
        </TableModule>
    )
}

const UserTable = () => {
    // const selector = useSelector(({
    //     productCategoryReducer: { productCategoryList, page, totalPage: totalPages, filters, loading } 
    // }) => ({ productCategoryList, loading, page, totalPages, filters }), shallowEqual)

    const selector = {
        userList: [
            { 
                user_id: 10,
                first_name: "Trần",
                last_name: "Văn",
                name: "Anh",
                phone: 123456,
                email: "sjhdj@gmail.com",
                user_group: "ADMIN",
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

    useEffect(() => {
        setState({
            ...state,
            checkAllItem: false,
            dataSources: selector.userList.map(item => ({
                ...item,
                checked: false
            }))
        })
    }, [selector.userList])

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