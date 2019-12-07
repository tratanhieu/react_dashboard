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
import {
    setCheckedItems, fetchWithPaginationAndFilter, getUpdateAction
} from '../../../../redux/reducers/productCategoryReducer';

const Render = ({
    dataSources, loading, totalPages, defaultActivePage, checkAllItem,
    onChange, onDelete, onChangePage, onCheckItem, onCheckAllItem, 
    cellWidth
}) => {

    const TableHeader = () => (
        <>
            <TableHeaderCell width={cellWidth[0]}>
                Tên loại sản phẩm
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[1]}>
                Slug Name
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[2]}>
                Create Date
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[3]}>
                Update Date
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[4]} textAlign="center">
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
            emptyColSpan={7}
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
                    </TableCell>
                    <TableCell width={cellWidth[1]}>
                        {item.slugName}
                    </TableCell>
                    <TableCell width={cellWidth[2]}>
                        {item.createDate}
                    </TableCell>
                    <TableCell width={cellWidth[3]}>
                        {item.updateDate}
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

const ProductCategoryTable = () => {
    const selector = useSelector(({
        productCategoryReducer: { productCategoryList, page, totalPage: totalPages, filters, loading, reload } 
    }) => ({ productCategoryList, loading, page, totalPages, filters, reload}), shallowEqual)

    const [state, setState] = useState({
        checkAllItem: false,
        dataSources: []
    });

    const [cellWidth, setCellWidth] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        setState({
            ...state,
            checkAllItem: false,
            dataSources: selector.productCategoryList.map(item => ({
                ...item,
                checked: false
            }))
        })

        setCellWidth(calcCellWidth([25, 25, 15, 15, 20], true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector.productCategoryList])

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
        cellWidth,
        defaultActivePage: selector.page,
        onChangePage: page => dispatch(fetchWithPaginationAndFilter(selector.filters, page)),
        onCheckItem: (index, checked) => {
            let checkedItems = [];
            state.dataSources[index].checked = checked;
            state.dataSources.forEach(item =>
                item.checked === true ? checkedItems.push(item.productCategoryId) : null
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