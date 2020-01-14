import React, { useState, useEffect } from 'react'
import { Form, Radio } from 'semantic-ui-react'

const ToggleActive = ({
    label = 'Trạng thái: ',
    onChange,
    inline = true,
    checked=false,
    ...rest
}) => {

    const [active, setActive] = useState(checked)

    const handleToggle = () => {
        const activeStatus = !active
        setActive(activeStatus)
        onChange(activeStatus)
    }

    useEffect(() => {
        setActive(checked)
    }, [checked])

    return (
        <Form.Field inline={inline}>
            <label>{label}</label>
            <Radio
                label={active ? 'Hiển thị' : 'Ẩn'}
                checked={active}
                toggle
                onChange={handleToggle} {...rest} />
        </Form.Field>
    )
}

export default ToggleActive