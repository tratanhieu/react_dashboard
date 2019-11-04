import React from 'react';
import { Grid, Button, Divider, Icon } from 'semantic-ui-react'

const ProductCategoryHeader = ({ onClickNew }) => {
    return (
        <Grid columns="equal" padded="vertically">
            <Grid.Row>
                <Grid.Column verticalAlign="middle">
                    <h1>Danh sách</h1>
                </Grid.Column>
                <Grid.Column>
                    <Button icon primary floated="right" labelPosition="left"
                        onClick={onClickNew}>
                        <Icon name="plus" />
                        Thêm mới
                    </Button>
                </Grid.Column>
            </Grid.Row>
            <Divider />
        </Grid>
    )
}

export default ProductCategoryHeader