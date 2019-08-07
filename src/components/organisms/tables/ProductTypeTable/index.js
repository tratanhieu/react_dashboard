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

import TableHeader from '../../../molecules/TableHeader';
import TableBody from '../../../molecules/TableBody';
import TableRow from '../../../molecules/TableRow';
import TableColumn from '../../../molecules/TableColumn';
import TablePagination from '../../../molecules/TablePagination';
import TableExecute from '../../../molecules/TableExecute';

// import style from './styles.module.scss'

const ProductTypeTable = ({totalPages, defaultActivePage, loading, checkboxItems, body}) => {
    
    const [checkAll, setCheckAll] = useState(false)

    const handleCheckAll = () => {
        setCheckAll(!checkAll)

        const checkboxItems = document.querySelectorAll(
            `div[data-checkbox='checkboxItem'] input[type='checkbox']:${
            checkAll ? `checked` : `not(:checked)`}`
        );
        checkboxItems.forEach(item => item.click());
    }

    const handleItemCheck = (e, checkbox) => {
        if (checkAll && !checkbox.checked) {
            setCheckAll(false)
            return
        }
        if (!checkAll && checkbox.checked && _checkCheckAll()) {
            setCheckAll(true)
        }
    }

    const handleExecute = () => {
        const items = _getAllCheckedItem()
        (items)
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
    
    const stateOptions = [
        {
            key: "1",
            text: "Việt Nam",
            value: "VietNam"
        },
        {
            key: "2",
            text: "Sinapore",
            value: "Sin"
        }
    ];

    return (
        <>
            <TableExecute
                stateOptions={stateOptions}
                loading
                onExecute={(value) => alert(value)}
            />
            <TableHeader 
                checkAll={checkAll}
                onChangeCheckbox={handleCheckAll}
            >
                <TableColumn>
                    Tên loại sản phẩm
                </TableColumn>
                <TableColumn width={2} tablet={3}>
                    Trạng thái
                </TableColumn>
            </TableHeader>
            <TableBody loading={loading}>
                {body.map(item =>
                    (<TableRow 
                        verticalAlign="middle"
                        onChangeCheckbox={handleItemCheck}
                        onView={() => alert("View")}
                        onDelete={() => alert("Delete")}
                    >
                        <TableColumn>
                            {item.name}
                        </TableColumn>
                        <TableColumn width={2} tablet={3}>
                            <Label color="green">
                                {item.status}
                            </Label>
                        </TableColumn>
                    </TableRow>)
                )}
            </TableBody>
            <TablePagination
                totalPages={totalPages}
                defaultActivePage={defaultActivePage}
            />
        </>
    )
}

export default ProductTypeTable