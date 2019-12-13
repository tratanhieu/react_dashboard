import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Label } from 'semantic-ui-react'
import { Image as Img} from "semantic-ui-react";
impor

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
} from '../../../../redux/reducers/productBrandReducer';

const Render = ({
    dataSources, loading, totalPages, defaultActivePage, checkAllItem,
    onChange, onDelete, onChangePage, onCheckItem, onCheckAllItem
}) => {
    const cellWidth = calcCellWidth([25, 10, 10, 10, 10, 25, 10], true)

    const TableHeader = () => (
        <>
            <TableHeaderCell width={cellWidth[0]}>
                Tên Chương trình
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[1]} textAlign="center">
                Ngày BĐ
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[2]} textAlign="center">
                Ngày KT
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[3]} textAlign="center">
                %
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[4]} textAlign="center">
                Sản Phẩm Áp Dụng
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[5]}>
                Mã Giảm Giá
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[6]} textAlign="center">
                Trạng Thái
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
            emptyColSpan={9}
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
                        {item.saleName}
                    </TableCell>
                    <TableCell width={cellWidth[1]}>
                        {item.startDate.}
                    </TableCell>
                    <TableCell width={cellWidth[2]}>
                        {item.endDate}
                    </TableCell>
                    <TableCell width={cellWidth[3]}>
                        {item.percent}
                    </TableCell>
                    <TableCell width={cellWidth[4]}>
                        {item.productsSale}
                    </TableCell>
                    <TableCell width={cellWidth[5]}>
                        {item.saleCode}
                    </TableCell>
                    <TableCell width={cellWidth[6]} textAlign="center">
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

const ProductBrandTable = () => {
    // const selector = useSelector(({
    //     productBrandReducer: { productBrandList, page, totalPage: totalPages, filters, loading, reload } 
    // }) => ({ productBrandList, loading: productBrandList.length === 0 ? true : false, page, totalPages, filters, reload}), shallowEqual)
    
    const selector = {
        productBrandList: [
            {
                saleId: "001",
                saleName: "Black Friday",
                startDate: new Date(2019, 11, 26),
                endDate: new Date(2019, 12, 30),
                percent: 20,
                productsSale: [1, 2, 3, 4],
                saleCode: "alksjhdacASD",
                status: "ACTIVE" 
                // status : {
                //     color: "red",
                //     text: "Stop"
                // }
            }
        ],
        loading: false,
        totalPages: 2,
        filters: {
        }
    }

    const [state, setState] = useState({
        checkAllItem: true,
        dataSources: []
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setState({
            ...state,
            checkAllItem: false,
            dataSources: selector.productBrandList.map(item => ({
                ...item,
                checked: false
            }))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector.productBrandList])

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
            console.log(state)
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

export default ProductBrandTable