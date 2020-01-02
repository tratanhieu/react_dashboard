import React from 'react'
import { TextField } from '@material-ui/core';

const Input = ({
    size="small",
    error = '',
    variant = "outlined",
    onChange,
    ...rest
}) => (
    <TextField
        style={{ width: "100%" }}
        error={!!error}
        size={size}
        variant={variant}
        helperText={error}
        onChange={e => onChange(e, e.currentTarget)}
        {...rest} />
)

export default Input