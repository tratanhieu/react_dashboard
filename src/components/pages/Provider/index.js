
import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import ProviderModal from '../../organisms/Provider/ProviderModal';
import ProviderTable from '../../organisms/Provider/ProviderTable';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../redux/reducers/providerReducer';

const Render = ({ createButtonLoading, onOpenCreate }) => (
    <>
        <ContentHeader
            title="Provider"
            createButtonLoading={createButtonLoading} 
            onOpenCreate={onOpenCreate}
        />
        <ProviderTable />
        <ProviderModal />
    </>
)

const Provider = () => {
    const selector = useSelector(({
        providerReducer: { createButtonLoading } 
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
export default Provider