import React from "react";
import { Table, Button, Checkbox } from "semantic-ui-react";
import FormInput from '../../../../atoms/FormInput';
import ImageUploads from "../../../../atoms/ImageUploads";

const ProductPackageTable = ({
    children
}) => (
    <Table celled selectable>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Package Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Images</Table.HeaderCell>
                <Table.HeaderCell>Active</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {children}
        </Table.Body>
    </Table>
);

export default ProductPackageTable;
