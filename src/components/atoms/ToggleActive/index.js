import React from 'react'
import { Switch, FormGroup, FormControlLabel } from '@material-ui/core';

const ToggleActive = ({
    color = "primary",
    checked = false,
    onChange,
    ...rest
}) => (
    <FormGroup style={{ marginTop: "8px" }}>
        <FormControlLabel
            control={
                <Switch
                    checked={checked}
                    color={color}
                    onChange={e => onChange(e, e.currentTarget)}
                    {...rest}
                />
            }
            label={checked ? 'Hiển thị' : 'Ẩn'}
        />
    </FormGroup>
)

export default ToggleActive