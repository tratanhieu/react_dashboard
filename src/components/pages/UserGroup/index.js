import React from 'react'

import UserGroupModal from '../../organisms/UserGroup/UserGroupModal';
import UserGroupHeader from '../../organisms/UserGroup/UserGroupHeader';
import UserGroupFilter from '../../organisms/UserGroup/UserGroupFilter';
import UserGroupTable from '../../organisms/UserGroup/UserGroupTable';
import ContentHeader from '../../organisms/ContentHeader';

const UserGroup = ({ onOpenCreate }) => (
    <>
        <ContentHeader title="User Group" onOpenCreate={onOpenCreate} />
        <UserGroupTable />
        <UserGroupModal />
    </>
)
export default UserGroup