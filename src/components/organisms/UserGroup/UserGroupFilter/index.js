import React from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import PageSearch from "../../../molecules/PageSearch";
import { setFilters } from "../../../../redux/reducers/userGroupReducer";

const Render = ({ onSearch }) => <PageSearch onSearch={onSearch} />

const UserGroupFilter = () => {
    const selector = useSelector(({ userGroupReducer: { filters } }) => ({ filters }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onSearch: search => dispatch(setFilters({ ...selector.filters, search }))
    }

    return <Render {...renderProps} />
}

export default UserGroupFilter
