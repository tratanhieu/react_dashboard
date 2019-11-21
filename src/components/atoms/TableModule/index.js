import React from "react";
import {
    Table,
    Checkbox,
    Button
} from "semantic-ui-react";

import "./style.css";

const TABLE_WIDTH = 1000;
const CHECKBOX_CELL_WIDTH = 50;
const ACTION_CELL_WIDTH = 100;

const TableModule = ({ loading, showCheckbox = false, header, children }) => {
    return (
        <Table celled selectable className={loading ? 'loading' : ''}>
        <Table.Header>
            <Table.Row>
                {showCheckbox ? (
                    <Table.HeaderCell
                    style={{ width: `${CHECKBOX_CELL_WIDTH}px` }}
                    textAlign="center"
                    >
                    <Checkbox />
                    </Table.HeaderCell>
                ) : null}
                {header}
                <Table.HeaderCell
                    style={{ width: `${ACTION_CELL_WIDTH}px` }}
                    textAlign="center"
                >
                    Actions
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>{children}</Table.Body>
        </Table>
    );
};

const TableRow = ({
    checked = false,
    children,
    showCheckbox = false,
    onChangeCheckbox,
    ...rest
}) => (
    <Table.Row {...rest}>
        {showCheckbox ? (
        <Table.Cell
            style={{ width: `${CHECKBOX_CELL_WIDTH}px` }}
            textAlign="center"
        >
            <Checkbox checked={checked} onChange={onChangeCheckbox} />
        </Table.Cell>
        ) : null}
        {children}
        <Table.Cell style={{ width: `${ACTION_CELL_WIDTH}px` }} textAlign="center">
            <Button size="mini" color="orange" icon="edit" />
            <Button size="mini" color="red" icon="trash" />
        </Table.Cell>
    </Table.Row>
);

const TableCell = ({ width, style, children, ...rest }) => (
    <Table.Cell style={{ ...style, width }} {...rest}>
        {children}
    </Table.Cell>
);

const TableHeaderCell = ({ width, style, children, ...rest }) => (
    <Table.HeaderCell style={{ ...style, width }} {...rest}>
        {children}
    </Table.HeaderCell>
);

const calcCellWidth = (cellWidths, showCheckbox) => {
    const perCell = showCheckbox
        ? TABLE_WIDTH - CHECKBOX_CELL_WIDTH - ACTION_CELL_WIDTH
        : TABLE_WIDTH - ACTION_CELL_WIDTH;
    return cellWidths.map(item => `${(item / 100) * perCell}px`);
};

export { TableModule, TableRow, TableCell, TableHeaderCell, calcCellWidth };
