import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import ProductTable from '../../organisms/Product/ProductTable'
import ProductForm from '../../organisms/Product/ProductForm'
import { resetSystemErrors } from '../../../redux/reducers/rootReducer'
import ContentHeader from 'components/organisms/ContentHeader'
import { fetchAll, getCreateAction } from '../../../redux/reducers/productReducer'

const ListProduct = ({ onOpenCreate }) => (
    <>
        <ContentHeader title="Product" onOpenCreate={onOpenCreate} />
        <ProductTable />
    </>
)

const Render = ({ openModal, ...rest }) => openModal ? <ProductForm /> : <ListProduct {...rest} />

const Product = () => {
    const selector = useSelector(({
        productReducer: { openModal, errors } 
    }) => ({ openModal, errors }), shallowEqual)

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
export default Product