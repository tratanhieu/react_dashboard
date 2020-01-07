import React from 'react'
import { Form } from 'semantic-ui-react'

import Fieldset from '../../atoms/Fieldset'
import { Radio, FormGroup, Select, RadioGroup, FormControlLabel } from '@material-ui/core';

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
                <FormGroup row>
                    {/* <FormControlLabel label="Status: " /> */}
                    <RadioGroup row aria-label="gender" name="gender1" onChange={(_, radio) => onFilterByStatus(radio.value)}>
                    {listStatus.map(item => (
                        <FormControlLabel
                            control={<Radio />}
                            key={item.key}
                            label={item.label}
                            value={item.key}
                            labelPlacement="end"
                            checked={statusValue === item.key}
                            onChange={(_, radio) => onFilterByStatus(radio.value)}
                        />
                    ))}
                </RadioGroup>
                </FormGroup>
                <Form.Group inline>
                    <Select
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