import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import UserModal from '../../organisms/User/UserModal';
import UserTable from '../../organisms/User/UserTable';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ContentHeader from '../../organisms/ContentHeader';

const User = ({ onOpenCreate }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <ContentHeader title="User" onOpenCreate={onOpenCreate} />
            <UserTable />
            <UserModal />
        </>
    )
}
export default User