import React from "react";
import { Table, Button } from "semantic-ui-react";

const OptionTable = ({ children, onOpenModal }) => (
    <Table celled selectable>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Package Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Images</Table.HeaderCell>
                <Table.HeaderCell>Active</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                <Button
                    size="small"
                    primary
                    icon="plus"
                    content="Add"
                    onClick={onOpenModal}
                />
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>{children}</Table.Body>
    </Table>
);

export default OptionTable;
