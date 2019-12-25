import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import GuestHeader from '../../organisms/Guest/GuestHeader';
import GuestTable from '../../organisms/Guest/GuestTable';
import GuestModal from '../../organisms/Guest/GuestModal';
import GuestFilter from '../../organisms/Guest/GuestFilter';
import GuestAction from '../../organisms/Guest/GuestAction';
import { fetchWithPaginationAndFilter } from '../../../redux/reducers/guestReducer';

const Render = ({ loading, reload, GuestList, page, totalPages, filters }) => (
    <>
        <GuestHeader />
        <GuestFilter filters={filters} />
        {/* <GuestAction /> */}
        <GuestTable
            loading={loading}
            reload={reload}
            filters={filters}
            defaultActivePage={page}
            totalPages={totalPages}
            dataSource={GuestList}
        />
        <GuestModal />
    </>
)

const Guest = () => {
    // const selector = useSelector(({
    //     GuestReducer: { GuestList, page, totalPages, filters, loading, reload } 
    // }) => ({ GuestList, loading, page, totalPages, filters, reload }), shallowEqual)

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

export default Guest