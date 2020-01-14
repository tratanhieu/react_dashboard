import React from 'react';
import { useDispatch } from 'react-redux'
import { Grid, Button, Icon } from 'semantic-ui-react'
import { getCreateAction } from '../../../../redux/reducers/guestReducer';

const Render = ({ onClickNew }) => {
    return (
        <Grid columns="equal" padded="vertically">
            <Grid.Row>
                <Grid.Column textAlign="left" verticalAlign="middle">
                    <h1>Danh sách khách hàng</h1>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const ProductBrandHeader = () => {
    const dispatch = useDispatch();
    const renderProps = {
        onClickNew: _ => dispatch(getCreateAction())
    }
    return <Render {...renderProps} />
}

export default ProductBrandHeader