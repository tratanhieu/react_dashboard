import React from 'react'
import { Button as ButtonSematic, Icon } from 'semantic-ui-react'

const Button = ({ loading, content, children, rest} ) => {
    return (
        <ButtonSematic disabled={loading} {...rest}>
            {loading ? <><Icon loading name="spinner" />&nbsp;&nbsp;</> : null}
            {content ? content : children}
        </ButtonSematic>
    )
}

export default Button