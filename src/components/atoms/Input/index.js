import React from 'react'
import { TextField } from '@material-ui/core';

const Input = ({
    size="small",
    error = '',
    variant = "outlined",
    onChange,
    value = '',
    ...rest
}) => (
    <TextField
        style={{ width: "100%" }}
        error={!!error}
        size={size}
        variant={variant}
        helperText={error}
        value={value}
        onChange={e => onChange(e, e.currentTarget)}
        {...rest} />
)

export default Input