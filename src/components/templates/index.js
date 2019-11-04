import React, { Component } from 'react'
import {
    Container, Icon, 
    Grid, Segment, Button, Divider,
} from 'semantic-ui-react'

import ProductCategoryTable from './ProductCategoryTable';
import ProductCategoryModal from './ProductCategoryModal';
import Main from '../layouts/Main';

class ProductCategoryTemplate extends Component {

    handleChangePagination = page => this.props.onPaginate(page)

    handleNew = () => this.props.onClickNew()

    handleExecute = (value, items) => this.props.onExecute(value, items)

    handleView = _id => this.props.onClickView(_id)

    handleCreate = productCategory => this.props.onCreate(productCategory)

    handleUpdate = productCategory => this.props.onUpdate(productCategory)

    handleDelete = async _id => this.props.onDelete(_id)

    render() {

        const { productCategoryList, productCategory, loading, totalPage, page } = this.props

        return (
            <Main>
                <Segment>
                    <Grid columns="equal" padded="vertically">
                        <Grid.Row>
                            <Grid.Column verticalAlign="middle">
                                <h1>Danh sách</h1>
                            </Grid.Column>
                            <Grid.Column>
                                <Button icon primary floated="right" labelPosition="left"
                                    onClick={this.handleNew.bind(this)}
                                >
                                    <Icon name="plus" />
                                    Thêm mới
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                    </Grid>
                    <ProductCategoryTable
                        loading={loading}
                        executeLoading={this.props.executeLoading}
                        body={productCategoryList}
                        totalPages={totalPage}
                        defaultActivePage={page}
                        onExecute={this.handleExecute.bind(this)}
                        onView={this.handleView.bind(this)}
                        onDelete={this.handleDelete.bind(this)}
                        onChangePagination={this.handleChangePagination.bind(this)}
                    />
                </Segment>
                <ProductCategoryModal
                    open={this.props.isOpenModal}
                    productCategory={productCategory}
                    modalAction={this.props.modalAction}
                    onCreate={this.handleCreate.bind(this)}
                    onUpdate={this.handleUpdate.bind(this)}
                    formLoading={this.props.formLoading}
                    onClose={this.props.onModalClose}
                />
            </Main>
        )
    }
}

export default ProductCategoryTemplate;