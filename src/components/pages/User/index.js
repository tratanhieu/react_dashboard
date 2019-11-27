import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import UserModal from '../../organisms/User/UserModal';
import UserTable from '../../organisms/User/UserTable';
import UserFilter from '../../organisms/User/UserFilter';
import UserHeader from '../../organisms/User/UserHeader';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';

const User = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
    }, [])

    return (
        <>
            <UserHeader/>
            <UserFilter />
            <UserTable />
            <UserModal open={false} />
        </>
    )
}
export default User