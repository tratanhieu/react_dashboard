import React from 'react'
import { Button as ButtonSematic, Icon } from 'semantic-ui-react'
import MaterialButton from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';

const Button = ({
    loading,
    color = 'primary',
    variant = 'contained',
    iconLabel = false,
    iconName,
    content,
    children,
    ...rest
}) => {
    const Icon = icons[iconName]
    return (
        <MaterialButton 
            color={color}
            variant={variant}
            startIcon={<Icon />}
            {...rest}
        >
            {/* {loading && <><Icon loading name="spinner" />&nbsp;&nbsp;</>} */}
            {/* {!loading && iconName && <Icon name={iconName} />} */}
            {content ? content : children}
        </MaterialButton>
    )
}

const icons = {
    addBoxIcon: AddBoxIcon
}

export default Button