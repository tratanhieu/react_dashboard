import React from 'react'
import { Grid } from 'semantic-ui-react'

import style from './styles.module.scss'

const TableHeader = ({children, ...rest}) => {
    return (
        <Grid columns="equal" padded {...rest}>
            <Grid.Row
                divided
                className={`${style.root}`}
            >
                {children}
            </Grid.Row>
        </Grid>
    )
}

export default TableHeader