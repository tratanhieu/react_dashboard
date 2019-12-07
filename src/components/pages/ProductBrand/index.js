import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import ProductBrandModal from '../../organisms/ProductBrand/ProductBrandModal';
import ProductBrandTable from '../../organisms/ProductBrand/ProductBrandTable';
import ProductBrandFilter from '../../organisms/ProductBrand/ProductBrandFilter';
import ProductBrandHeader from '../../organisms/ProductBrand/ProductBrandHeader';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';

const ProductBrand = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <ProductBrandHeader/>
            <ProductBrandFilter />
            <ProductBrandTable />
            <ProductBrandModal />
        </>
    )
}
export default ProductBrand