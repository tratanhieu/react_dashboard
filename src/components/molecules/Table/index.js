import React, { useState } from 'react'
import {
    Container, Form, Modal, Transition, Icon, Image, 
    Grid,
    Segment,
    Dimmer,
    Checkbox,
    Label,
    Header,
    Button,
    Dropdown, Divider
} from 'semantic-ui-react'

import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableColumn from '../TableColumn';
import TablePagination from '../TablePagination';

import style from './styles.module.scss'

const Table = ({children, totalPages, defaultActivePage, loading, header, body, ...rest}) => {
    
    const [checkAll, setCheckAll] = useState(false)

    const handleCheckAll = () => {
        setCheckAll(!checkAll)

        const checkboxItems = document.querySelectorAll(
            `div[data-checkbox='checkboxItem'] input[type='checkbox']:${
            checkAll ? `checked` : `not(:checked)`}`
        );
        checkboxItems.forEach(item => item.click());
    }

    const handleExecute = () => {
        const checkboxItems = _getAllCheckedItem();
        console.log("Total " + checkboxItems.length);
    }

    const _checkCheckAll = () => {
        const checkboxItems = document.querySelectorAll(
            `div[data-checkbox='checkboxItem'] input[type='checkbox']`
        ).length;

        const checkboxItemsChecked = document.querySelectorAll(
            `div[data-checkbox='checkboxItem'] input[type='checkbox']:checked`
        ).length + 1;

        return checkboxItems === checkboxItemsChecked;
    }

    const _getAllCheckedItem = () => {
        let data = [];
        const checkboxItems = document.querySelectorAll(
            `div[data-checkbox='checkboxItem'] input[type='checkbox']:checked`
        );

        if (checkboxItems) {
            checkboxItems.forEach(item => data.push(item.value));
        }
        return data;
    }
    
    return (
        <>
            <TableHeader>
                <TableColumn verticalAlign="middle" width={1} className={`${style.checkboxWidth}`}>
                    <Checkbox
                        checked={checkAll}
                        onChange={handleCheckAll}
                    />
                </TableColumn>
                {header.map(item => (
                    <TableColumn width={item.width}>
                        {item.name}
                    </TableColumn> )
                )}
            </TableHeader>
            <TableBody>
                {children}
            </TableBody>
            <TablePagination
                totalPages={totalPages}
                defaultActivePage={defaultActivePage}
            />
        </>
    )
}

export default Table