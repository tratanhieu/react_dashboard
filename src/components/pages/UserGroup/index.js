import React from 'react'

import UserGroupModal from '../../organisms/UserGroup/UserGroupModal';
import UserGroupHeader from '../../organisms/UserGroup/UserGroupHeader';
import UserGroupFilter from '../../organisms/UserGroup/UserGroupFilter';
import UserGroupTable from '../../organisms/UserGroup/UserGroupTable';

const UserGroup = () => (
    <>
        <UserGroupHeader />
        <UserGroupFilter />
        <UserGroupTable />
        <UserGroupModal />
    </>
)
export default UserGroup