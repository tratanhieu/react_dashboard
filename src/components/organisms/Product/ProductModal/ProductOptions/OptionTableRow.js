import React from "react";
import { Table, Image, Checkbox, Button } from "semantic-ui-react";

const OptionTableRow = ({
    option,
    index,
    styles,
    onChangeOptionActive,
    onOpenChangeModal,
    onRemove
}) => (
    <Table.Row>
        <Table.Cell>{option.packageName}</Table.Cell>
        <Table.Cell>{option.quantity}</Table.Cell>
        <Table.Cell className={styles.imageCell}>
            {option.images.map((image, key) => (
                <Image
                key={key}
                className={`${styles.tableImage}${
                    image.active ? ` ${styles.tableImageActive}` : ``
                }`}
                src={image.src}
                />
            ))}
        </Table.Cell>
        <Table.Cell textAlign="center">
            <Checkbox
                checked={option.active}
                onChange={(_, checkbox) =>
                    onChangeOptionActive(index, checkbox.checked)
                }
            />
        </Table.Cell>
        <Table.Cell textAlign="center">
            <Button
                size="small"
                onClick={onOpenChangeModal}
                icon="edit"
                color="orange"
            />
            <Button size="small" icon="trash" color="red" onClick={onRemove} />
        </Table.Cell>
    </Table.Row>
);

export default OptionTableRow;
