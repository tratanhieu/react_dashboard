import React from 'react'

import "./style.css";

const ClickableText = ({ children, onClickText, idText, ...rest }) => (
    <p className="clickable_text" {...rest} onClick={onClickText} id={idText}>
        {children}
    </p>
)

export default ClickableText