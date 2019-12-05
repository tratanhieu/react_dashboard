import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import UserModal from '../../organisms/User/UserModal';
import UserTable from '../../organisms/User/UserTable';
import UserFilter from '../../organisms/User/UserFilter';
import UserHeader from '../../organisms/User/UserHeader';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import UserAction from '../../organisms/User/UserAction';

const User = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <UserHeader />
            <UserFilter />
            <UserAction />
            <UserTable />
            <UserModal />
        </>
    )
}
export default User