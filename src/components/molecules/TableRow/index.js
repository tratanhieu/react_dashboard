import React from 'react'
import { Grid, Checkbox, Button, Icon, Popup } from 'semantic-ui-react'

import TableColumn from '../TableColumn'

import { _handleCheckItem } from '../../../commons/multiple-checkbox';

import style from './styles.module.scss'
import { DELETED } from '../../../constants/entites';

const TableRow = ({children, status, onChangeCheckbox, checkboxClassName, onView, onDelete, checkboxValue, ...rest}) => (
    <Grid.Row
        divided
        className={`${style.root}`}
        {...rest}
    >
        <TableColumn verticalAlign="middle" width={1} className={`${style.checkboxItem}`}>
            <Checkbox
                onChange={_handleCheckItem}
                data-checkbox="checkboxItem"
                value={checkboxValue}
            />
        </TableColumn>
        {children}
        <TableColumn width={2} className={`${style.action}`}>
            {(status !== DELETED) ? 
            <>
                <Popup inverted content="Xem" trigger={
                    <Button size="mini" color="instagram" className={`${style.buttonView}`}
                        onClick={onView} icon="eye" />
                } />
                <Popup inverted content="Xóa" trigger={
                    <Button size="mini" color="google plus" className={`${style.buttonDelete}`}
                        onClick={onDelete} icon='trash alternate' />
                } />
            </> : 
            <>
                <Popup inverted content="Khôi phục" trigger={
                    <Button size="mini" color="orange" className={`${style.buttonDelete}`}
                        onClick={onDelete} icon='undo alternate' />
                } />
                <Popup inverted content="Xóa vĩnh viễn" trigger={
                    <Button size="mini" color="google plus" className={`${style.buttonDelete}`}
                        onClick={onDelete} icon='delete alternate' />
                } />
            </>
            }
        </TableColumn>
    </Grid.Row>
)
export default TableRow