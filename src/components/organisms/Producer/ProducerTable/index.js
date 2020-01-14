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
} from '../../../../redux/reducers/producerReducer';

const Render = ({
    dataSources, loading, totalPages, defaultActivePage, checkAllItem,
    onChange, onDelete, onChangePage, onCheckItem, onCheckAllItem
}) => {
    const cellWidth = calcCellWidth([25, 35, 20, 10, 10], true)

    const TableHeader = () => (
        <>
            <TableHeaderCell width={cellWidth[0]}>
                Tên Nhà Cung Cấp
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[1]}>
                Địa Chỉ
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[2]}>
                Người Giao Dịch
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[3]}>
                SĐT
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
                    onChange={_ => onChange(item.producerId)}
                    onDelete={_ => onDelete(item.producerId)}
                >
                    <TableCell width={cellWidth[0]}>
                        {item.name}
                    </TableCell>
                    <TableCell width={cellWidth[1]}>
                        {item.address}
                    </TableCell>
                    <TableCell width={cellWidth[2]}>
                        {item.trader}
                    </TableCell>
                    <TableCell width={cellWidth[3]}>
                        {item.phone}
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

const ProducerTable = () => {
    // const selector = useSelector(({
    //     producerReducer: { producerList, page, totalPage: totalPages, filters, loading, reload } 
    // }) => ({ producerList, loading, page, totalPages, filters, reload}), shallowEqual)

    const selector = {
        producerList: [
            { 
                producer_id: 10,
                name: "Samsung",
                address: "Da Nang",
                trader: "Nguyen Minh Phuong",
                phone: "0123456789",
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
            dataSources: selector.producerList.map(item => ({
                ...item,
                checked: false
            }))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector.producerList])

    // useEffect(() => {
    //     dispatch(fetchWithPaginationAndFilter(selector.filters, 1))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selector.filters, dispatch])

    // useEffect(() => {
    //     if (selector.reload) {
    //         dispatch(fetchWithPaginationAndFilter(selector.filters, selector.page))
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selector.reload])

    const renderProps = {
        ...state,
        ...selector,
        defaultActivePage: selector.page,
        onChangePage: page => dispatch(fetchWithPaginationAndFilter(selector.filters, page)),
        onCheckItem: (index, checked) => {
            let checkedItems = [];
            state.dataSources[index].checked = checked;
            state.dataSources.forEach(item =>
                item.checked === true ? checkedItems.push(item.producerId) : null
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
                        checkedItems.push(item.producerId);
                    }
                    return {
                        ...item,
                        checked: item.checked !== checkAllItem ? checkAllItem : item.checked
                    };
                })
            });
            dispatch(setCheckedItems(checkedItems))
        },
        onChange: producerId => dispatch(getUpdateAction(producerId))
    }

    return <Render {...renderProps} />
}

export default ProducerTable