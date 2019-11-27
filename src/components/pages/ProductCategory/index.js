import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import ProductCategoryHeader from '../../organisms/ProductCategory/ProductCategoryHeader';
import ProductCategoryTable from '../../organisms/ProductCategory/ProductCategoryTable';
import ProductCategoryModal from '../../organisms/ProductCategory/ProductCategoryModal';
import ProductCategoryFilter from '../../organisms/ProductCategory/ProductCategoryFilter';
import ProductCategoryAction from '../../organisms/ProductCategory/ProductCategoryAction';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';

const ProductCategory = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
    }, [])

    return (
        <>
            <ProductCategoryHeader />
            <ProductCategoryFilter />
            <ProductCategoryAction />
            <ProductCategoryTable />
            <ProductCategoryModal />
        </>
    )
}

export default ProductCategory