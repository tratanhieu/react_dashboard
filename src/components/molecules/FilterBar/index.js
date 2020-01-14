import React from 'react'
import { Form } from 'semantic-ui-react'

import Fieldset from '../../atoms/Fieldset'

const FilterBar = ({
    children,
    statusValue = '',
    sortValue = 'createDate,DESC',
    listStatus = [],
    listSort = [],
    onFilterByStatus,
    onChangeSortValue,
    ...rest
}) => {
    return (
        <Fieldset icon="sort content descending" title="Filter and Sort" {...rest}>
            {children}
            <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <Form.Group inline>
                    <label>Status: </label>
                    {listStatus.map(item => (
                        <Form.Radio
                            key={item.key}
                            label={item.label}
                            value={item.key}
                            checked={statusValue === item.key}
                            onChange={(_, radio) => onFilterByStatus(radio.value)}
                        />
                    ))}
                </Form.Group>
                <Form.Group inline>
                    <label>Sort: </label>
                    <Form.Select
                        style={{ width: "100%" }}
                        options={listSort}
                        defaultValue={sortValue}
                        placeholder="-- Sort by --"
                        onChange={(_, select) => onChangeSortValue(select.value)}
                    />
                </Form.Group>
            </div>
        </Fieldset>
    )
}

export default FilterBar