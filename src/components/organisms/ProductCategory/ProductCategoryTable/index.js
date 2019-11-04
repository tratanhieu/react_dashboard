import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Label } from 'semantic-ui-react'

import TableHeader from '../../../molecules/TableHeader'
import TableBody from '../../../molecules/TableBody'
import TableRow from '../../../molecules/TableRow'
import TableColumn from '../../../molecules/TableColumn'
import TablePagination from '../../../molecules/TablePagination'
import TableExecute from '../../../molecules/TableExecute'

import { DEFAULT_STATUS } from '../../../../constants/entites'
import { DEFAULT_ACTIONS } from '../../../../constants/pages';

import { _getAllCheckedItem } from '../../../../commons/multiple-checkbox';

const Render = ({
    productCategoryList,
    totalPage, defaultActivePage,
    loading, executeLoading, onView, onDelete,
    handleChangePagination, handleExecute
}) => {
    return (
        <>
            <TableExecute
                stateOptions={DEFAULT_ACTIONS}
                loading={executeLoading}
                onExecute={handleExecute}
            />
            <TableHeader>
                <TableColumn>
                    Tên loại sản phẩm
                </TableColumn>
                <TableColumn textAlign="center" computer={2} tablet={3}>
                    Trạng thái
                </TableColumn>
            </TableHeader>
            <TableBody loading={loading}>
                {productCategoryList ? productCategoryList.map((item, i) =>
                    (<TableRow key={i}
                        verticalAlign="middle"
                        status={item.status}
                        checkboxValue={item.product_category_id}
                        onView={() => onView(item.product_category_id)}
                        onDelete={() => onDelete(item.product_category_id)}
                    >
                        <TableColumn>
                            {item.name}
                        </TableColumn>
                        <TableColumn textAlign="center" computer={2} tablet={3}>
                            <Label color={DEFAULT_STATUS[item.status].color}>
                                {DEFAULT_STATUS[item.status].text}
                            </Label>
                        </TableColumn>
                    </TableRow>)
                ): 
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
                onPageChange={handleChangePagination}
            /> : null
            }
        </>
    )
}

const ProductCategoryTable = props => {
    const selector = useSelector(({ productCategoryReducer }) => ({
        productCategoryList: productCategoryReducer.productCategoryList,
        page: productCategoryReducer.page,
        totalPage: productCategoryReducer.totalPage,
        loading: productCategoryReducer.loading,
        errors: productCategoryReducer.errors
    }), shallowEqual)

    const renderProps = {
        ...selector,
        defaultActivePage: selector.page,
        handleExecute: value => {
            const items = _getAllCheckedItem()
            console.log(items + "," + value)
            // onExecute(value,items)
        }
    }

    return <Render {...renderProps} />
}

export default ProductCategoryTable