import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Label } from 'semantic-ui-react'

import {
    TableModule,
    TableRow,
    TableCell,
    TableHeaderCell,
    calcCellWidth
} from "../../../atoms/TableModule";

import { DEFAULT_STATUS } from '../../../../constants/entites'
// REDUX
import { fetchWithPaginationAndFilter } from '../../../../redux/reducers/userReducer';

const Render = ({
    dataSources, loading, totalPages, defaultActivePage,
    onChange, onDelete, onChangePage, onCheckItem
}) => {
    const cellWidth = calcCellWidth([30, 20, 20, 20, 10], false)

    const TableHeader = () => (
        <>
            <TableHeaderCell width={cellWidth[0]}>
                Name
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[1]}>
                User In Group
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[2]}>
                Create Date
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[3]}>
                Update Date
            </TableHeaderCell>
            <TableHeaderCell width={cellWidth[4]} textAlign="center">
                Status
            </TableHeaderCell>
        </>
    )

    return (
        <TableModule
            loading={loading}
            showCheckbox={false}
            header={<TableHeader />} 
            currentItems={dataSources.length}
            emptyColSpan={6}
            totalPages={totalPages}
            defaultActivePage={defaultActivePage}
            onChangePage={onChangePage}
        >
        {
            dataSources.map((item, index) => (
                <TableRow
                    key={index}
                    checked={item.checked}
                    onCheckItem={checked => onCheckItem(index, checked)}
                    onChange={_ => onChange(item.id)}
                    onDelete={onDelete}
                >
                    <TableCell width={cellWidth[0]}>
                        {item.name}
                    </TableCell>
                    <TableCell width={cellWidth[1]}>
                        {item.userInGroup}
                    </TableCell>
                    <TableCell width={cellWidth[2]}>
                        {item.createDate.toLocaleString('vi')}
                    </TableCell>
                    <TableCell width={cellWidth[3]}>
                        {item.updateDate.toLocaleString('vi')}
                    </TableCell>
                    <TableCell width={cellWidth[4]} textAlign="center">
                        <Label color={DEFAULT_STATUS[item.status].color}>
                            {DEFAULT_STATUS[item.status].text}
                        </Label>
                    </TableCell>
                </TableRow>
            ))
        }
        </TableModule>
    )
}

const UserGroupTable = () => {
    // const selector = useSelector(({
    //     productCategoryReducer: { productCategoryList, page, totalPage: totalPages, filters, loading } 
    // }) => ({ productCategoryList, loading, page, totalPages, filters }), shallowEqual)

    const selector = {
        userGroupList: [
            { 
                userGroupId: 1,
                name: "Administrator",
                userInGroup: 1,
                createDate: new Date(),
                updateDate: new Date(),
                status: "ACTIVE" 
            },
            { 
                userGroupId: 1,
                name: "Manager",
                userInGroup: 2,
                createDate: new Date(),
                updateDate: new Date(),
                status: "ACTIVE" 
            },
            { 
                userGroupId: 1,
                name: "Seller",
                userInGroup: 10,
                createDate: new Date(),
                updateDate: new Date(),
                status: "ACTIVE" 
            }
        ],
        loading: false,
        totalPages: 2,
        filters: {}
    }

    const [state, setState] = useState({
        checkAllItem: false,
        dataSources: []
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setState({
            ...state,
            checkAllItem: false,
            dataSources: selector.userGroupList.map(item => ({
                ...item,
                checked: false
            }))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector.userGroupList])

    // useEffect(() => {
    //     dispatch(fetchWithPaginationAndFilter(selector.filters, 1))
    // }, [selector.filters])

    const renderProps = {
        ...state,
        ...selector,
        defaultActivePage: selector.page,
        onChangePage: page => dispatch(fetchWithPaginationAndFilter(selector.filters, page))
    }

    return <Render {...renderProps} />
}

export default UserGroupTable