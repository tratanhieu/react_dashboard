import React from 'react'
import { TextField } from '@material-ui/core';

const Input = ({
    size="small",
    margin = "dense",
    error = '',
    variant = "outlined",
    onChange,
    value = '',
    ...rest
}) => (
    <TextField
        style={{ width: "100%", marginTop: "8px", marginBottom: "8px" }}
        error={!!error}
        margin={margin}
        size={size}
        variant={variant}
        helperText={error}
        value={value}
        onChange={e => onChange(e, e.currentTarget)}
        {...rest} />
)

export default Input