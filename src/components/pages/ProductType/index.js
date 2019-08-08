import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Container, Icon, 
    Grid, Segment, Button, Divider,
} from 'semantic-ui-react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ProductTypeTable from '../../organisms/tables/ProductTypeTable';

// Redux
import { fetchAll, findById } from '../../../redux/api-actions/productTypeApiAction'
import { VIEW } from '../../../constants/pages';
import ProductTypeModal from '../../organisms/modals/ProductTypeModal';

const header = [
    {
        width: 5,
        name: "Tên loại sản phẩm"
    },
    {
        width: 3,
        name: "Trạng thái"
    }
]

class ProductType extends Component {
    state = {
        open: false,
        action: VIEW
    }

    componentDidMount() {
        this.props.fetchAll().catch(error => console.log(error))
    }

    handleChangePagination = page => 
        this.props.fetchAll(page).catch(error => console.log(error))

    handleView = _id => {
        this.props.findById(_id).then(result => {
            this.setState({open: true})
            console.log(this.props.productType)
        }
        ).catch(error => console.log(error))
    }

    handleDelete = _id => {
        Swal.fire({
            title: 'Bạn chắc chắn rồi chứ?',
            text: "Tất cả các sản phẩm liên quan sẽ bị xóa và bạn không thể khôi phục hành động này.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok, Xóa',
            cancelButtonText: 'Không, Hủy!',
            cancelButtonColor: "#767676",
            confirmButtonColor: "#dd4b39",
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Đã xóa!',
                    'Tất cả sản phẩm liên quan đã được xóa và không thể khôi phục lại được',
                    'success'
                )
            }
        })
    }

    render() {

        const { productTypes, productType, loading, totalPage, page } = this.props

        return (
            <Container>
                <Segment>
                    <Grid columns="equal" padded="vertically">
                        <Grid.Row>
                            <Grid.Column verticalAlign="middle">
                                <h1>Danh sách</h1>
                            </Grid.Column>
                            <Grid.Column>
                                <Button icon primary floated="right" labelPosition="left"
                                    onClick={() => this.setState({open: true})}
                                >
                                    <Icon name="plus" />
                                    Thêm mới
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                    </Grid>
                    <ProductTypeTable header={header}
                        loading={loading}
                        body={productTypes}
                        totalPages={totalPage}
                        defaultActivePage={page}
                        onView={this.handleView.bind(this)}
                        onDelete={this.handleDelete.bind(this)}
                        onChangePagination={this.handleChangePagination.bind(this)}
                    />
                </Segment>
                <ProductTypeModal
                    open={this.state.open}
                    productType={productType}
                    action={this.state.action}
                    onClose={() => this.setState({open: false})}
                />
            </Container>
        )
    }
}

const mapStateToProps = state => ({
	productTypes: state.productTypeReducer.productTypes,
	totalPage: state.productTypeReducer.totalPage,
	productType: state.productTypeReducer.productType,
	page: state.productTypeReducer.page,
	loading: state.productTypeReducer.loading
})

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchAll, findById
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductType)