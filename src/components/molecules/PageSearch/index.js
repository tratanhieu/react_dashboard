import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'

import Fieldset from '../../atoms/Fieldset'

const PageSearch = ({
    title = "Search",
    buttonSearchLabel="Search",
    color = "blue",
    loading = false,
    placeholder="Type some thing and enter to search...",
    onSearch,
    ...rest
}) => {
    const [value, setValue] = useState('')
    
    return (
        <Fieldset icon="search" title={title}>
            <Input
            fluid
            // disabled
            action={{
                color,
                icon: "search",
                content: buttonSearchLabel,
                onClick: _ => onSearch(value),
                loading
            }}
            placeholder="Type some thing and enter to search..."
            value={value}
            onChange={(_, input) => setValue(input.value)}
            {...rest} />
        </Fieldset>
    )
}

export default PageSearch