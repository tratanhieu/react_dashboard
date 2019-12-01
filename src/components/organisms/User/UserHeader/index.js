import React from 'react';
// import { useDispatch } from 'react-redux'
import { Grid, Button, Icon } from 'semantic-ui-react'
// import { getInsert } from '../../../../redux/actions/productCategoryAction';

const Render = ({ onClickNew }) => {
    return (
        <Grid columns="equal" padded="vertically">
            <Grid.Row>
                <Grid.Column textAlign="left" verticalAlign="middle">
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
        </Grid>
    )
}

const UserHeader = () => {
    // const dispatch = useDispatch();
    const renderProps = {
        // onClickNew: _ => dispatch(getInsert())
    }
    return <Render {...renderProps} />
}

export default UserHeader