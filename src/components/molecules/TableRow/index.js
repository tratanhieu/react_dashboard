import React from 'react'
import { Grid, Checkbox, Button, Icon } from 'semantic-ui-react'

import TableColumn from '../TableColumn'

import style from './styles.module.scss'

const TableRow = ({children, onChangeCheckbox, checkboxClassName, onView, onDelete, checkboxValue, ...rest}) => (
    <Grid.Row
        divided
        className={`${style.root}`}
        {...rest}
    >
        <TableColumn verticalAlign="middle" width={1} className={`${style.checkboxItem}`}>
            <Checkbox
                onChange={(event, data) => onChangeCheckbox(event, data)}
                data-checkbox="checkboxItem"
                value={checkboxValue}
            />
        </TableColumn>
        {children}
        <TableColumn width={2} className={`${style.action}`}>
            <Button animated='vertical' size="mini" color="instagram" className={`${style.buttonView}`}
                onClick={onView}
            >
                <Button.Content hidden>Xem</Button.Content>
                <Button.Content visible>
                    <Icon name='eye' />
                </Button.Content>
            </Button>
            <Button animated='vertical' size="mini" color="google plus" className={`${style.buttonDelete}`}
                onClick={onDelete}
            >
                <Button.Content hidden>Xóa</Button.Content>
                <Button.Content visible>
                    <Icon name='trash alternate' />
                </Button.Content>
            </Button>
        </TableColumn>
    </Grid.Row>
)
export default TableRow