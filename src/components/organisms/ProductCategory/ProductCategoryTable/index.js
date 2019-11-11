import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Label } from 'semantic-ui-react'
import Pusher from 'pusher-js';

import TableHeader from '../../../molecules/TableHeader'
import TableBody from '../../../molecules/TableBody'
import TableRow from '../../../molecules/TableRow'
import TableColumn from '../../../molecules/TableColumn'
import TablePagination from '../../../molecules/TablePagination'
import TableExecute from '../../../molecules/TableExecute'

import { DEFAULT_STATUS } from '../../../../constants/entites'
import { DEFAULT_ACTIONS } from '../../../../constants/pages';

import { _getAllCheckedItem, _unCheckAll, _checkItem, _handleCheckItem, _handleCheckAll } from '../../../../commons/multiple-checkbox'
import { useActions } from '../../../../redux/useActions'
import { onPageChange, doExecute, fetchAll } from '../../../../redux/api-actions/productCategoryApiAction'
import { reload,  onChangeCheckItem, onChangeCheckAllItem } from '../../../../redux/actions/productCategoryAction';

const Render = ({
    productCategoryList,
    totalPage, defaultActivePage, checkAllItem, checkboxItems,
    loading, executeLoading,
    onView, onDelete,
    onPageChange, handleExecute
}) => {
    console.log(checkboxItems)
    return (
        <>
            <TableExecute
                stateOptions={DEFAULT_ACTIONS}
                loading={executeLoading}
                onExecute={handleExecute}
            />
            <TableHeader
                checkAllItem={checkAllItem}>
                <TableColumn>
                    Tên loại sản phẩm
                </TableColumn>
                <TableColumn textAlign="center" computer={2} tablet={3}>
                    Trạng thái
                </TableColumn>
            </TableHeader>
            <TableBody loading={loading}>
                {productCategoryList ? productCategoryList.map(item => (
                    <TableRow key={item.product_category_id}
                        verticalAlign="middle"
                        status={item.status}
                        checkboxValue={item.product_category_id}
                        checkItem={checkboxItems.includes(item.product_category_id)}
                        onView={() => onView(item.product_category_id)}
                        onDelete={() => onDelete(item.product_category_id)}>
                        <TableColumn>
                            {item.name}
                        </TableColumn>
                        <TableColumn textAlign="center" computer={2} tablet={3}>
                            <Label color={DEFAULT_STATUS[item.status].color}>
                                {DEFAULT_STATUS[item.status].text}
                            </Label>
                        </TableColumn>
                    </TableRow>
                )): 
                    <TableRow>
                        <TableColumn>
                            <Label>Không có dữ liệu để hiển thị</Label>
                        </TableColumn>
                    </TableRow>
                }
            </TableBody>
            { (productCategoryList && !loading) ?
            <TablePagination
                totalPages={totalPage}
                defaultActivePage={defaultActivePage}
                onPageChange={onPageChange}
            /> : null
            }
        </>
    )
}

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
        dispatch(fetchAll())
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