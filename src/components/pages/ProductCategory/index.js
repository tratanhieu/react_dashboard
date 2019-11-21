import React from 'react'

import ProductCategoryHeader from '../../organisms/ProductCategory/ProductCategoryHeader';
import ProductCategoryTable from '../../organisms/ProductCategory/ProductCategoryTable';
import ProductCategoryModal from '../../organisms/ProductCategory/ProductCategoryModal';
import ProductCategoryFilter from '../../organisms/ProductCategory/ProductCategoryFilter';
import ProductModal from '../../organisms/Product/ProductModal';

const ProductCategory = () => (
    <>
        <ProductCategoryHeader />
        <ProductCategoryFilter />
        <ProductCategoryTable onChangeCheckItem={checkedItems => console.log(checkedItems)} />
        <ProductCategoryModal />
        <ProductModal />
    </>
)
export default ProductCategory