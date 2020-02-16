import React from 'react'
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const Render = ({
    style = {},
    required = false,
    label = '',
    size='small',
    renderInput,
    ...rest
}) => (
    <Autocomplete
        size={size}
        title={label}
        autoHighlight
        style={{ width: "100%", marginTop: "8px", marginBottom: "8px", ...style }}
        renderInput={params => (
            <TextField {...params} required={required} label={label} variant="outlined" fullWidth />
        )}
        {...rest}
    />
)

const SelectSearch = ({ name, onChange, ...rest }) => {

    const renderProps = {
        ...rest,
        onChange: (_, value) => onChange(name, { name, value: value })
    }

    return <Render {...renderProps} />
}

export default SelectSearch