import React, { useState } from "react";
import { Form, Select, Input, Button, Icon } from "semantic-ui-react";

import Fieldset from "../../../atoms/Fieldset";

const options = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "o", text: "Other", value: "other" }
];

const sorts = [
    { key: "name,desc", text: "Name Descending", value: "name,desc" },
    { key: "name,asc", text: "Name Ascending", value: "name,asc" },
    { key: "price,desc", text: "Price Descending", value: "price,desc" },
    { key: "price,asc", text: "Price Ascending", value: "price,desc" }
];

const listStatus = [
    { key: "ALL", label: "All" },
    { key: "ACTIVE", label: "Active" },
    { key: "HIDDEN", label: "Hidden" },
    { key: "DELETE", label: "Delete" }
];

const ProductCategoryFilter = () => {
    const [status, setStatus] = useState(listStatus[0].key);
    const handleChange = (e, { value }) => setStatus(value);

    return (
        <Form>
        <Fieldset icon="search" title="Search">
            <Input
            fluid
            // disabled
            action={{
                color: "blue",
                icon: "search",
                content: "Search"
                // loading: true
            }}
            iconPosition="right"
            placeholder="Order #"
            />
        </Fieldset>
        <Fieldset icon="sort content descending" title="Filter and Sort">
            <Form.Group widths="equal">
            <Form.Select
                fluid
                disabled
                loading
                search
                label="Category"
                options={options}
                onChange={_ => alert("Done")}
                placeholder="Category"
            />
            <Form.Select
                fluid
                label="Group Type"
                options={options}
                placeholder="Group Type"
            />
            <Form.Select
                fluid
                label="Type"
                options={options}
                placeholder="Type"
            />
            </Form.Group>
            <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Form.Group inline>
                <label>Status: </label>
                {listStatus.map(item => (
                    <Form.Radio
                    label={item.label}
                    value={item.key}
                    checked={status === item.key}
                    onChange={handleChange}
                    />
                ))}
            </Form.Group>
            <Form.Group inline>
                <label>Sort: </label>
                <Form.Select
                    style={{ width: "100%" }}
                    options={sorts}
                    placeholder="Type"
                />
                </Form.Group>
            </div>
        </Fieldset>
        <Fieldset icon="hand point down outline" title="Actions">
            <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ display: "flex" }}>
                    <Select style={{ marginRight: 8 }} fluid options={options} placeholder="Type" />
                    <Button primary>Execute</Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button primary>
                        <Icon name="cloud upload" inverted />Import
                    </Button>
                    <Button primary>
                        <Icon name="cloud download" inverted />Export
                    </Button>
                </div>
            </div>
        </Fieldset>
        </Form>
    );
};

export default ProductCategoryFilter;
