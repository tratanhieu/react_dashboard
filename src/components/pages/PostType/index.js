import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

<<<<<<< HEAD:src/components/pages/PostType/index.js
import PostTypeModal from '../../organisms/PostType/PostTypeModal';
import PostTypeTable from '../../organisms/PostType/PostTypeTable';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../redux/reducers/postTypeReducer';
=======
import PromotionHeader from '../../organisms/Promotion/PromotionHeader';
import PromotionTable from '../../organisms/Promotion/PromotionTable';
import PromotionModal from '../../organisms/Promotion/PromotionModal';
import PromotionFilter from '../../organisms/Promotion/PromotionFilter';
import PromotionAction from '../../organisms/Promotion/PromotionAction';
// import { fetchWithPaginationAndFilter } from '../../../redux/reducers/PromotionReducer';
>>>>>>> parent of e5623ed... change something:src/components/pages/Promotion/index.js

const Render = ({ loading, reload, promotionList, page, totalPages, filters }) => (
    <>
<<<<<<< HEAD:src/components/pages/PostType/index.js
        <ContentHeader title="Post Type" onOpenCreate={onOpenCreate} />
        <PostTypeTable />
        <PostTypeModal />
    </>
)

const PostType = () => {
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
export default PostType
=======
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
>>>>>>> parent of e5623ed... change something:src/components/pages/Promotion/index.js
