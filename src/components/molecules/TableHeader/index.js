import React from 'react'
import { Grid, Checkbox } from 'semantic-ui-react'

import TableColumn from '../TableColumn'

import style from './styles.module.scss'

const TableHeader = ({children, checkAll, onChangeCheckbox, ...rest}) => {
    return (
        <Grid columns="equal" padded {...rest}>
            <Grid.Row verticalAlign="middle"
                divided
                className={`${style.root}`}
            >
                <TableColumn width={1} className={`${style.checkboxAll}`}>
                    <Checkbox
                        checked={checkAll}
                        onChange={onChangeCheckbox}
                    />
                </TableColumn>
                {children}
                <TableColumn width={1} className={`${style.action}`}>
                    Hành động
                </TableColumn>
            </Grid.Row>
        </Grid>
    )
}

export default TableHeader