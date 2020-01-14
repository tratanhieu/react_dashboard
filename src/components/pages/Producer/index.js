import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import ProducerTable from '../../organisms/Producer/ProducerTable';
import ProducerHeader from '../../organisms/Producer/ProducerHeader';
import ProducerFilter from '../../organisms/Producer/ProducerFilter';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ProducerModal from '../../organisms/Producer/ProducerModal';

// const Producer = () => {
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(resetSystemErrors())
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])

//     return (
//         <>
//             <ProducerHeader/>
//             <ProducerFilter />
//             <ProducerTable />
//             <ProducerModal />
//         </>
//     )
// }
// export default Producer

const Render = ({ loading, reload, ProducerList, page, totalPages, filters }) => (
    <>
        <ProducerHeader />
        <ProducerFilter filters={filters} />
        {/* <ProducerAction /> */}
        <ProducerTable
            loading={loading}
            reload={reload}
            filters={filters}
            defaultActivePage={page}
            totalPages={totalPages}
            dataSource={ProducerList}
        />
        <ProducerModal />
    </>
)

const Producer = () => {
    // const selector = useSelector(({
    //     SaleManagementReducer: { SaleManagementList, page, totalPages, filters, loading, reload } 
    // }) => ({ SaleManagementList, loading, page, totalPages, filters, reload }), shallowEqual)

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

export default Producer