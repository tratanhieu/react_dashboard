import React from 'react'
import { Form, Radio } from 'semantic-ui-react'

const ToggleActive = ({
    label = 'Trạng thái: ',
    inline = true,
    checked = false,
    ...rest
}) => (
    <Form.Field inline={inline}>
        <label>{label}</label>
        <Radio
            label={checked ? 'Hiển thị' : 'Ẩn'}
            checked={checked}
            toggle
            {...rest}
        />
    </Form.Field>
)

export default ToggleActive