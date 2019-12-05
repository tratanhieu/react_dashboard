import React from 'react'

import UserGroupModal from '../../organisms/UserGroup/UserGroupModal';
import UserGroupHeader from '../../organisms/UserGroup/UserGroupHeader';
import UserGroupFilter from '../../organisms/UserGroup/UserGroupFilter';
import UserGroupTable from '../../organisms/UserGroup/UserGroupTable';
import UserGroupAction from '../../organisms/UserGroup/UserGroupAction';

const UserGroup = () => (
    <>
        <UserGroupHeader />
        <UserGroupFilter />
        <UserGroupAction />
        <UserGroupTable />
        <UserGroupModal />
    </>
)
export default UserGroup