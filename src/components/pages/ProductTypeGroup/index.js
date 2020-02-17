import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import ProductTypeGroupModal from '../../organisms/ProductTypeGroup/ProductTypeGroupModal';
import ProductTypeGroupTable from '../../organisms/ProductTypeGroup/ProductTypeGroupTable';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../redux/reducers/productTypeGroupReducer';

const Render = ({ createButtonLoading, onOpenCreate }) => (
    <>
        <ContentHeader
            title="Product TypeGroup"
            createButtonLoading={createButtonLoading} 
            onOpenCreate={onOpenCreate}
        />
        <ProductTypeGroupTable />
        <ProductTypeGroupModal />
    </>
)

const ProductTypeGroup = () => {
    const selector = useSelector(({
        productTypeGroupReducer: { createButtonLoading } 
    }) => ({ createButtonLoading }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        dispatch(fetchAll())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderProps = {
        ...selector,
        onOpenCreate: () => dispatch(getCreateAction())
    }

    return <Render {...renderProps} />
}
export default ProductTypeGroup