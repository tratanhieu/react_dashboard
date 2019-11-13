import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import ProductCategoryHeader from '../../organisms/ProductCategory/ProductCategoryHeader';
import ProductCategoryTable from '../../organisms/ProductCategory/ProductCategoryTable';
import ProductCategoryModal from '../../organisms/ProductCategory/ProductCategoryModal';
import Main from '../../templates/layouts/Main';
import ProductCategoryFilter from '../../organisms/ProductCategory/ProductCategoryFilter';

const ProductCategory = () => (
    <>
        <ProductCategoryHeader />
        <ProductCategoryFilter />
        <ProductCategoryTable />
        <ProductCategoryModal />
    </>
)
export default ProductCategory