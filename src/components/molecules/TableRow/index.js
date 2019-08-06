import React from 'react'
import { Grid } from 'semantic-ui-react'

import style from './styles.module.scss'

const TableRow = ({children, ...rest}) => (
    <Grid.Row
        divided
        className={`${style.root}`}
        {...rest}
    >
        {children}
    </Grid.Row>
)
export default TableRow