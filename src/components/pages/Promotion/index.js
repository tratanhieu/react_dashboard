import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import PromotionModal from '../../organisms/Promotion/PromotionModal';
import PromotionTable from '../../organisms/Promotion/PromotionTable';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../redux/reducers/promotionReducer';

const Render = ({ onOpenCreate }) => (
    <>
        <ContentHeader title="Post Type" onOpenCreate={onOpenCreate} />
        <PromotionTable />
        <PromotionModal />
    </>
)

const Promotion = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        dispatch(fetchAll())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderProps = {
        onOpenCreate: () => dispatch(getCreateAction())
    }
    
    return <Render {...renderProps} />
}
export default Promotion