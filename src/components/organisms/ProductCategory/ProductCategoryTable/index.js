import React, { useEffect } from 'react'
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

const cellWidth = calcCellWidth([70, 30], true);

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

const Render = ({
    productCategoryList,
    totalPage, defaultActivePage, checkAllItem, checkboxItems,
    loading,
    onView, onDelete,
    onPageChange
}) => (
    <>
        {/* <TableExecute
            stateOptions={DEFAULT_ACTIONS}
            loading={executeLoading}
            onExecute={handleExecute}
        /> */}
        <TableModule loading={loading} showCheckbox header={<TableHeader />}>
            {productCategoryList ? productCategoryList.map(item => (
                <TableRow key={item.product_category_id} showCheckbox
                    // verticalAlign="middle"
                    // status={item.status}
                    // checkboxValue={item.product_category_id}
                    // checkItem={checkboxItems.includes(item.product_category_id)}
                    // onView={() => onView(item.product_category_id)}
                    // onDelete={() => onDelete(item.product_category_id)}
                >
                    <TableCell width={cellWidth[0]}>
                        {item.name}
                    </TableCell>
                    <TableCell width={cellWidth[1]} textAlign="center">
                        {/* <Label color={DEFAULT_STATUS[item.status].color}>
                            {DEFAULT_STATUS[item.status].text}
                        </Label> */}
                        {item.name}
                    </TableCell>
                </TableRow>
            )): 
                <TableRow>
                    <TableCell>
                        <Label>Không có dữ liệu để hiển thị</Label>
                    </TableCell>
                </TableRow>
            }
        </TableModule>
        { (productCategoryList && !loading) ?
        <TablePagination
            totalPages={totalPage}
            defaultActivePage={defaultActivePage}
            onPageChange={onPageChange}
        /> : null
        }
    </>
)

const ProductCategoryTable = () => {
    const selector = useSelector(({ productCategoryReducer }) => ({
        productCategoryList: productCategoryReducer.productCategoryList,
        page: productCategoryReducer.page,
        totalPage: productCategoryReducer.totalPage,
        loading: productCategoryReducer.loading,
        checkAllItem: productCategoryReducer.checkAllItem,
        checkboxItems: productCategoryReducer.checkboxItems,
        reload: productCategoryReducer.reload,
        errors: productCategoryReducer.errors
    }), shallowEqual)

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
        ...selector,
        ...actions,
        defaultActivePage: selector.page,
        handleExecute: value => {
            const items = _getAllCheckedItem()
            dispatch(doExecute(items, value))
        }
    }

    return <Render {...renderProps} />
}

export default ProductCategoryTable