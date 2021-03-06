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
import {
    setCheckedItems, fetchWithPaginationAndFilter, getUpdateAction
} from '../../../../redux/reducers/productTypeReducer';
import Slug from '../../../atoms/Slug';

import { formatDateTime } from '../../../../commons/utils'

const Render = ({
    dataSources, loading, totalPages, defaultActivePage, checkAllItem,
    onChange, onDelete, onChangePage, onCheckItem, onCheckAllItem
}) => {
    const cellWidth = calcCellWidth([30, 18, 18, 12, 12, 10], true)

    const TableHeader = () => (
        <>
            <TableHeaderCell width={cellWidth[0]}>
                Product Type Group Name
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[1]}>
                Product Category
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[2]}>
                Product Type Group
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[3]}>
                Create Date
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[4]}>
                Update Date
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[5]} textAlign="center">
                Trạng thái
            </TableHeaderCell>
        </>
    )

    return (
        <TableModule
            loading={loading}
            showCheckbox 
            header={<TableHeader />}
            currentItems={dataSources.length}
            totalPages={totalPages}
            defaultActivePage={defaultActivePage}
            checkAllItem={checkAllItem}
            onCheckAllItem={checked => onCheckAllItem(checked)}
            onChangePage={onChangePage}
            emptyColSpan={8}
        >
        {
            dataSources.map((item, index) => (
                <TableRow
                    key={index}
                    showCheckbox
                    checked={item.checked}
                    onCheckItem={checked => onCheckItem(index, checked)}
                    onChange={_ => onChange(item.productBrandId)}
                    onDelete={_ => onDelete(item.productBrandId)}
                >
                    <TableCell width={cellWidth[0]}>
                        {item.name}
                        <Slug>{item.slugName}</Slug>
                    </TableCell>
                    <TableCell width={cellWidth[1]}>
                        {item.productCategory.name}
                    </TableCell>
                    <TableCell width={cellWidth[2]}>
                        {item.productTypeGroup.name}
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

const ProductTypeTable = () => {
    // const selector = useSelector(({
    //     productTypeReducer: { productTypeList, page, totalPage: totalPages, filters, loading, reload } 
    // }) => ({ productTypeList, loading, page, totalPages, filters, reload}), shallowEqual)

    const selector = {
        productTypeList: [
            { 
                productTypeId: 10,
                name: "Bia",
                slugName: "bia",
                productCategory: {
                    productCategoryId: 1,
                    name: "Đồ uống"
                },
                productTypeGroup: {
                    productTypeGroupId: 1,
                    name: "Bia"
                },
                createDate: Date.now(),
                updateDate: Date.now(),
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
            dataSources: selector.productTypeList.map(item => ({
                ...item,
                checked: false
            }))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector.productTypeList])

    useEffect(() => {
        dispatch(fetchWithPaginationAndFilter(selector.filters, 1))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector.filters, dispatch])

    useEffect(() => {
        if (selector.reload) {
            dispatch(fetchWithPaginationAndFilter(selector.filters, selector.page))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector.reload])

    const renderProps = {
        ...state,
        ...selector,
        defaultActivePage: selector.page,
        onChangePage: page => dispatch(fetchWithPaginationAndFilter(selector.filters, page)),
        onCheckItem: (index, checked) => {
            let checkedItems = [];
            state.dataSources[index].checked = checked;
            state.dataSources.forEach(item =>
                item.checked === true ? checkedItems.push(item.productBrandId) : null
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
                        checkedItems.push(item.productBrandId);
                    }
                    return {
                        ...item,
                        checked: item.checked !== checkAllItem ? checkAllItem : item.checked
                    };
                })
            });
            dispatch(setCheckedItems(checkedItems))
        },
        onChange: productBrandId => dispatch(getUpdateAction(productBrandId))
    }

    return <Render {...renderProps} />
}

export default ProductTypeTable