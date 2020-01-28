import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import UserGroupModal from '../../organisms/UserGroup/UserGroupModal';
import UserGroupTable from '../../organisms/UserGroup/UserGroupTable';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll } from '../../../redux/reducers/userGroupReducer';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';

const Render = ({ onOpenCreate }) => (
    <>
        <ContentHeader title="User Group" onOpenCreate={onOpenCreate} />
        <UserGroupTable />
        <UserGroupModal />
    </>
)

const UserGroup = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        dispatch(fetchAll())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Render />
}
export default UserGroup