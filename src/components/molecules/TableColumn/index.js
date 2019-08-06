import React from 'react'
import { Grid } from 'semantic-ui-react'

const TableColumn = ({children, ...rest}) => (
    <Grid.Column {...rest}>
        {children}
    </Grid.Column>
)
export default TableColumn