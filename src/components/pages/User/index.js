import React from 'react'

import UserModal from '../../organisms/User/UserModal';
import UserTable from '../../organisms/User/UserTable';
import UserFilter from '../../organisms/User/UserFilter';
import UserHeader from '../../organisms/User/UserHeader';

const User = () => (
    <>
        <UserHeader/>
        <UserFilter />
        <UserTable />
        <UserModal open={false} />
    </>
)
export default User