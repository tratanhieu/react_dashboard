import React from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Form } from 'semantic-ui-react'

import PageSearch from "../../../molecules/PageSearch";
import FilterBar from "../../../molecules/FilterBar";
import { setFilters } from "../../../../redux/reducers/productCategoryReducer";

const sorts = [
    { key: "name,desc", text: "Name Descending", value: "name,desc" },
    { key: "name,asc", text: "Name Ascending", value: "name,asc" },
    { key: "price,desc", text: "Price Descending", value: "price,desc" },
    { key: "price,asc", text: "Price Ascending", value: "price,desc" }
];

const listStatus = [
    { key: "", label: "All" },
    { key: "ACTIVE", label: "Active" },
    { key: "HIDDEN", label: "Hidden" },
    { key: "DELETE", label: "Delete" }
];

const Render = ({ filters, onSearch, onFilterByStatus, onChangeSortValue }) => (
    <Form>
        <PageSearch onSearch={onSearch} />
        <FilterBar
            statusValue={filters.status}
            sortValue={filters.sort}
            listStatus={listStatus}
            listSort={sorts}
            onFilterByStatus={onFilterByStatus}
            onChangeSortValue={onChangeSortValue}
        />
    </Form>
)

const UserFilter = () => {
    const selector = useSelector(({ productCategoryReducer: { filters } }) => ({ filters }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onSearch: search => {
            dispatch(setFilters({ ...selector.filters, search }))
        }, 
        onFilterByStatus: status => {
            dispatch(setFilters({ ...selector.filters, status }))
        },
        onChangeSortValue: sort => {
            dispatch(setFilters({ ...selector.filters, sort }))
        }
    }

    return <Render {...renderProps} />
}

export default UserFilter
