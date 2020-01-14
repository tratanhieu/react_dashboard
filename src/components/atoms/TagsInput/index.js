import React from 'react'
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const TagsInput = ({
    style = {},
    label = "Tags",
    multiple = true,
    filterSelectedOptions,
    size='small',
    inputLabel = 'Select Box',
    renderInput,
    ...rest
}) => (
    <Autocomplete
        style={{ width: "100%", marginTop: "8px", marginBottom: "8px", ...style }}
        size={size}
        title={label}
        multiple={multiple}
        filterSelectedOptions={filterSelectedOptions}
        renderInput={params => (
            <TextField {...params} label={label} variant="outlined" fullWidth />
        )}
        {...rest}
    />
)

export default TagsInput