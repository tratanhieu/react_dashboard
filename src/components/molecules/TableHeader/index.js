import React from 'react'
import { Grid, Checkbox } from 'semantic-ui-react'

import TableColumn from '../TableColumn'

import { _handleCheckAll } from '../../../commons/multiple-checkbox';

import style from './styles.module.scss'

const TableHeader = ({children, checkAllItem, onChangeCheckAllItem, ...rest}) => {
    return (
        <Grid columns="equal" padded {...rest}>
            <Grid.Row verticalAlign="middle"
                divided
                className={`${style.root}`}
            >
                <TableColumn width={1} className={`${style.checkboxAll}`}>
                    <Checkbox
                        table-header-checkbox="tableCheckAllItem"
                        defaultChecked={checkAllItem}
                        onChange={_handleCheckAll}
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