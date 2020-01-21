import React from 'react'

const Image = ({
    alt = "",
    style = {},
    ...rest
}) => (
    <img style={{ width: '100%', ...style }} {...rest} alt={alt} />
)

export default Image