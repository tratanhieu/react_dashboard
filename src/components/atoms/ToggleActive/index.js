import React, { useState } from 'react'
import { Form, Radio } from 'semantic-ui-react'

const ToggleActive = ({
    label='Trạng thái: ',
    onChangeStatus,
    inline = true,
    checked=false,
    ...rest
}) => {

    const [active, setActive] = useState(checked)

    const status = active ? 'Hiển thị' : 'Ẩn'

    const handleToggle = () => {
        const activeStatus = !active
        setActive(activeStatus)
        onChangeStatus(activeStatus)
    }

    return (
        <Form.Field inline={inline}>
            <label>{label}</label>
            <Radio label={status} onChange={handleToggle} checked={active} toggle {...rest} />
        </Form.Field>
    )
}

export default ToggleActive