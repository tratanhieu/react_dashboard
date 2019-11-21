import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Label } from 'semantic-ui-react'
import Pusher from 'pusher-js';

// import TableHeader from '../../../molecules/TableHeader'
// import TableBody from '../../../molecules/TableBody'
// import TableRow from '../../../molecules/TableRow'
// import TableColumn from '../../../molecules/TableColumn'
import TablePagination from '../../../molecules/TablePagination'
import {
    TableModule,
    TableRow,
    TableCell,
    TableHeaderCell,
    calcCellWidth
} from "../../../atoms/TableModule";

import { DEFAULT_STATUS } from '../../../../constants/entites'
// import { DEFAULT_ACTIONS } from '../../../../constants/pages';

import { _getAllCheckedItem } from '../../../../commons/multiple-checkbox'
import { useActions } from '../../../../redux/useActions'
import { onPageChange, doExecute, fetchAll } from '../../../../redux/api-actions/productCategoryApiAction'
import { reload } from '../../../../redux/actions/productCategoryAction';
import { fetchWithPagination } from '../../../../redux/reducers/productCategoryReducer';

const Render = ({
    totalPage, defaultActivePage, checkAllItem, checkboxItems,
    loading,
    onView, onDelete,
    onPageChange,
    dataSources,
    onChange,
    onCheckItem,
    onCheckAllItem
}) => {
    const cellWidth = calcCellWidth([80, 20], true)

    const TableHeader = () => (
        <>
            <TableHeaderCell width={cellWidth[0]}>
                Tên loại sản phẩm
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[1]} textAlign="center">
                Trạng thái
            </TableHeaderCell>
        </>
    )

    const Footer = () => (
        <TableHeaderCell colSpan="4">
            <TablePagination
                totalPages={totalPage}
                defaultActivePage={defaultActivePage}
                onPageChange={onPageChange}
            />
        </TableHeaderCell>
    )

    const EmptyRow = () => (
        <TableHeaderCell colSpan={4} textAlign="center">
            Data is empty...
        </TableHeaderCell>
    )

    return (
        <TableModule
            loading={loading}
            showCheckbox 
            header={<TableHeader />} 
            footer={<Footer />}
            checkAllItem={checkAllItem}
            onCheckAllItem={checked => onCheckAllItem(checked)}
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
                    </TableCell>
                    <TableCell width={cellWidth[1]} textAlign="center">
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

const ProductCategoryTable = ({ onChangeCheckItem }) => {
    const selector = useSelector(({ productCategoryReducer }) => ({
        productCategoryList: productCategoryReducer.productCategoryList,
        page: productCategoryReducer.page,
        totalPage: productCategoryReducer.totalPage,
        loading: productCategoryReducer.loading,
        reload: productCategoryReducer.reload,
        errors: productCategoryReducer.errors
    }), shallowEqual)

    const [state, setState] = useState({
        checkAllItem: false,
        dataSources: []
    });

    const dispatch = useDispatch();

    const actions = useActions({
        onPageChange
    })

    useEffect(() => {
        if (selector.reload) {
            dispatch(fetchAll(selector.page))
        }
    }, [selector.reload])

    useEffect(() => {
        setState({
            ...state,
            checkAllItem: false,
            dataSources: selector.productCategoryList.map(item => ({
                ...item,
                checked: false
            }))
        })
    }, [selector.productCategoryList])

    useEffect(() => {
        dispatch(fetchWithPagination())
        const pusher = new Pusher('7853616a98fac75c9b66', {
            cluster: 'ap3',
            encrypted: true
        });
        const channel = pusher.subscribe('spring_reactjs-development');
        channel.bind('PRODUCT_CATEGORY', _ => {
            dispatch(reload(_getAllCheckedItem()))
        });
    }, [])

    const renderProps = {
        ...state,
        ...selector,
        ...actions,
        defaultActivePage: selector.page,
        onCheckItem: (index, checked) => {
            const checkedItems = [];
            state.dataSources[index].checked = checked;
            state.dataSources.forEach(item =>
                item.checked === true ? checkedItems.push(item.product_category_id) : null
            );
            state.checkAllItem = checkedItems.length === state.dataSources.length
            setState({ ...state })
            onChangeCheckItem(checkedItems)
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
            onChangeCheckItem(checkedItems);
        }
    }

    return <Render {...renderProps} />
}

export default ProductCategoryTable