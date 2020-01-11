import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import SaleManagementHeader from '../../organisms/SaleManagement/SaleManagementHeader';
import SaleManagementTable from '../../organisms/SaleManagement/SaleManagementTable';
import SaleManagementModal from '../../organisms/SaleManagement/SaleManagementModal';
import SaleManagementFilter from '../../organisms/SaleManagement/SaleManagementFilter';
import SaleManagementAction from '../../organisms/SaleManagement/SaleManagementAction';
import { fetchWithPaginationAndFilter } from '../../../redux/reducers/saleManagementReducer';

const Render = ({ loading, reload, SaleManagementList, page, totalPages, filters }) => (
    <>
        <SaleManagementHeader />
        <SaleManagementFilter filters={filters} />
        <SaleManagementTable
            loading={loading}
            reload={reload}
            filters={filters}
            defaultActivePage={page}
            totalPages={totalPages}
            dataSource={SaleManagementList}
        />
        <SaleManagementModal open={true} />
    </>
)

const SaleManagement = () => {
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

export default SaleManagement