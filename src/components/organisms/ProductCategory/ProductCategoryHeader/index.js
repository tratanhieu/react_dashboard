import React from 'react';
import { useDispatch } from 'react-redux'
import { Grid, Button, Divider, Icon } from 'semantic-ui-react'
import { getInsert } from '../../../../redux/actions/productCategoryAction';

const Render = ({ onClickNew }) => {
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

const ProductCategoryHeader = () => {
    const dispatch = useDispatch();
    const renderProps = {
        onClickNew: _ => dispatch(getInsert())
    }
    return <Render {...renderProps} />
}

export default ProductCategoryHeader