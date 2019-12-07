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
import Slug from '../../../atoms/Slug';

import { DEFAULT_STATUS } from '../../../../constants/entites'
// REDUX
import {
    setCheckedItems, fetchWithPaginationAndFilter, getUpdateAction
} from '../../../../redux/reducers/productCategoryReducer';
import { formatDateTime } from '../../../../commons/utils';

const Render = ({
    dataSources, loading, totalPages, defaultActivePage, checkAllItem,
    onChange, onDelete, onChangePage, onCheckItem, onCheckAllItem
}) => {
    const cellWidth = calcCellWidth([50, 15, 15, 20])

    const TableHeader = () => (
        <>
            <TableHeaderCell width={cellWidth[0]}>
                Product Category Name
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[1]}>
                Create Date
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[2]}>
                Update Date
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[3]} textAlign="center">
                Status
            </TableHeaderCell>
        </>
    )

    return (
        <TableModule
            loading={loading}
            header={<TableHeader />}
            currentItems={dataSources.length}
            totalPages={totalPages}
            defaultActivePage={defaultActivePage}
            checkAllItem={checkAllItem}
            onCheckAllItem={checked => onCheckAllItem(checked)}
            onChangePage={onChangePage}
            emptyColSpan={6}
        >
        {
            dataSources.map((item, index) => (
                <TableRow
                    key={index}
                    showCheckbox
                    checked={item.checked}
                    onCheckItem={checked => onCheckItem(index, checked)}
                    onChange={_ => onChange(item.productCategoryId)}
                    onDelete={_ => onDelete(item.productCategoryId)}
                >
                    <TableCell width={cellWidth[0]}>
                        {item.name}
                        <Slug>{item.slugName}</Slug>
                    </TableCell>
                    <TableCell width={cellWidth[1]}>
                        {formatDateTime(item.createDate)}
                    </TableCell>
                    <TableCell width={cellWidth[2]}>
                        {formatDateTime(item.updateDate)}
                    </TableCell>
                    <TableCell width={cellWidth[3]} textAlign="center">
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

const ProductCategoryTable = ({ loading, reload,
    dataSource = [], filters = {}, defaultActivePage, totalPages }) => {
    const [state, setState] = useState({
        checkAllItem: false,
        dataSources: []
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setState({
            ...state,
            checkAllItem: false,
            dataSources: dataSource.map(item => ({
                ...item,
                checked: false
            }))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSource])

    useEffect(() => {
        if (reload) {
            dispatch(fetchWithPaginationAndFilter(filters, defaultActivePage))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])

    const renderProps = {
        ...state,
        loading,
        defaultActivePage,
        totalPages,
        onChangePage: pageValue => dispatch(fetchWithPaginationAndFilter(filters, pageValue)),
        onCheckItem: (index, checked) => {
            let checkedItems = [];
            state.dataSources[index].checked = checked;
            state.dataSources.forEach(item =>
                item.checked ? checkedItems.push(item.productCategoryId) : null
            );
            state.checkAllItem = checkedItems.length === state.dataSources.length
            setState({ ...state })
            dispatch(setCheckedItems(checkedItems))
        },
        onCheckAllItem: checkAllItem => {
            let checkedItems = [];
            setState({
                ...state,
                checkAllItem,
                dataSources: state.dataSources.map(item => {
                    if (checkAllItem) {
                        checkedItems.push(item.productCategoryId);
                    }
                    return {
                        ...item,
                        checked: item.checked !== checkAllItem ? checkAllItem : item.checked
                    };
                })
            });
            dispatch(setCheckedItems(checkedItems))
        },
        onChange: productCategoryId => dispatch(getUpdateAction(productCategoryId))
    }

    return <Render {...renderProps} />
}

export default ProductCategoryTable