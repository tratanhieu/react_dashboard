import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
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
import { setCheckedItems, fetchWithPaginationAndFilter } from '../../../../redux/reducers/userReducer';
import Slug from '../../../atoms/Slug';
import { formatDateTime } from '../../../../commons/utils';

const Render = ({
    dataSources, loading, totalPages, defaultActivePage, checkAllItem,
    onChange, onDelete, onChangePage, onCheckItem, onCheckAllItem
}) => {
    const cellWidth = calcCellWidth([30, 25, 15, 10, 10, 10], true)

    const TableHeader = () => (
        <>
            <TableHeaderCell width={cellWidth[0]}>
                Title
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[1]}>
                Tags
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[2]}>
                Post Type
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[3]}>
                Create Date
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[4]}>
                Update Date
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[5]} textAlign="center">
                Status
            </TableHeaderCell>
        </>
    )

    return (
        <TableModule
            loading={loading}
            showCheckbox 
            header={<TableHeader />} 
            emptyColSpan={cellWidth.length + 2}
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
                        {item.name}
                        <Slug>{item.slugName}</Slug>
                    </TableCell>
                    <TableCell width={cellWidth[1]}>
                        {item.tags.map((tag, index) => 
                            <>
                                {index === 0 ? '' : ', '}
                                <a key={index} href={`tags/${tag.slugName}`}>{tag.name}</a>
                            </>
                        )}
                    </TableCell>
                    <TableCell width={cellWidth[2]}>
                        {item.postType.name}
                    </TableCell>
                    <TableCell width={cellWidth[3]}>
                        {formatDateTime(item.createDate)}
                    </TableCell>
                    <TableCell width={cellWidth[4]}>
                        {formatDateTime(item.updateDate)}
                    </TableCell>
                    <TableCell width={cellWidth[5]} textAlign="center">
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
                postId: 298392,
                slugName: "khi-naof-banjq-uyeets-didnh-lay-vo",
                name: "Khi naof banjq uyeets didnh lay vo",
                tags: [
                    { slugName: 'a-b', name: 'giảm giá' },
                    { slugName: 'khuyen-mai', name: 'Khuyến mãi' }
                ],
                postType: {
                    postTypeId: 1,
                    name: 'Vui hài'
                },
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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