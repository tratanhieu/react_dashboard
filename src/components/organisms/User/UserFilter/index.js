import React from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Form, Select, Button, Icon } from "semantic-ui-react";

import Fieldset from "../../../atoms/Fieldset";
import PageSearch from "../../../molecules/PageSearch";
import FilterBar from "../../../molecules/FilterBar";
import { setFilters } from "../../../../redux/reducers/productCategoryReducer";

const options = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "o", text: "Other", value: "other" }
];

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
        <Fieldset icon="hand point down outline" title="Actions">
            <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ display: "flex" }}>
                    <Select style={{ minWidth: 160, marginRight: 8 }} fluid options={options} placeholder="Type" />
                    <Button primary>Execute</Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button primary>
                        <Icon name="cloud upload" inverted />Import
                    </Button>
                    <Button primary>
                        <Icon name="cloud download" inverted />Export
                    </Button>
                </div>
            </div>
        </Fieldset>
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
