import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import PromotionHeader from '../../organisms/Promotion/PromotionHeader';
import PromotionTable from '../../organisms/Promotion/PromotionTable';
import PromotionModal from '../../organisms/Promotion/PromotionModal';
import PromotionFilter from '../../organisms/Promotion/PromotionFilter';
import PromotionAction from '../../organisms/Promotion/PromotionAction';
// import { fetchWithPaginationAndFilter } from '../../../redux/reducers/PromotionReducer';

const Render = ({ loading, reload, promotionList, page, totalPages, filters }) => (
    <>
        <PromotionHeader />
        <PromotionFilter filters={filters} />
        {/* <PromotionAction /> */}
        <PromotionTable
            loading={loading}
            reload={reload}
            filters={filters}
            defaultActivePage={page}
            totalPages={totalPages}
            dataSource={promotionList}
        />
        <PromotionModal />
    </>
)

const Promotion = () => {
    // const selector = useSelector(({
    //     PromotionReducer: { PromotionList, page, totalPages, filters, loading, reload } 
    // }) => ({ PromotionList, loading, page, totalPages, filters, reload }), shallowEqual)

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchWithPaginationAndFilter(selector.filters, 1))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // const renderProps = {
    //     ...selector
    // }

    return <Render/>
}

export default Promotion