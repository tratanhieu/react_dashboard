import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pusher from 'pusher-js';

import Swal from 'sweetalert2'

// Redux
import { fetchAll, findById, doExecute, doDelete } from '../../../redux/api-actions/productCategoryApiAction'
import { getInsert, closeModal } from '../../../redux/actions/productCategoryAction'
import { VIEW, INSERT } from '../../../constants/pages';

import { ALERT_SUCCESS, ALERT_ERROR, CONFIRM_DELETE } from '../../../commons/sweet-alert-modal';
import HeaderBar from '../../organisms/HeaderBar';

import ProductCategoryHeader from '../../organisms/ProductCategory/ProductCategoryHeader';
import ProductCategoryTable from '../../organisms/ProductCategory/ProductCategoryTable';
import ProductCategoryModal from '../../organisms/ProductCategory/ProductCategoryModal';
import Main from '../../templates/layouts/Main';

class ProductCategoryc extends Component {
    state = {
        openModal: false,
        executeLoading: false,
        formLoading: false,
        action: VIEW
    }

    componentDidMount = () => {
        this.props.fetchAll().catch(error => { throw new Error(error.message) })

        const pusher = new Pusher('7853616a98fac75c9b66', {
            cluster: 'ap3',
            encrypted: true
        });
        const channel = pusher.subscribe('spring_reactjs-development');
        channel.bind('PRODUCT_CATEGORY', data => {
            this.props.fetchAll().catch(error => { throw new Error(error.message) })
        });
    }

    handleChangePagination = page => 
        this.props.fetchAll(page).catch(error => console.log(error))

    handleClickNew = () => {
        this.props.getInsert()
        this.setState({
            openModal: true,
            action: INSERT
        })
    }

    handleExecute = (value, items) => {
        this.props.doExecute(items, value, this.props.page)
        .catch(error => console.log(error)).finally(_ => this.setState({ openModal: false }))
    }

    handleView = _id => {
        this.props.findById(_id).then(_ => {
            this.setState({openModal: true, action: VIEW})
        }).catch(error => ALERT_ERROR(error)
            .then(_ => this.setState({open: false}))
        )
    }

    handleCreate = (productCategory) => {
        this.props.doCreate(productCategory)
        .then(_ => 
            ALERT_SUCCESS("Thêm danh mục sản phẩm mới thành công")
            .then(_ => this.setState({openModal: false}))
        ).catch(error => ALERT_ERROR(error)
            .then(_ => this.setState({openModal: false}))
        ).finally(_ => this.setState({formLoading: false}))
    }

    handleUpdate = (productCategory) => {
        this.props.doUpdate(productCategory, this.props.page)
        .then(_ => {
            ALERT_SUCCESS("Cập nhật danh mục sản phẩm thành công").then(_ => 
                this.setState({openModal: false})   
            )
        }).catch(error => console.log(error))
    }

    handleDelete = async _id => {
        const result = await CONFIRM_DELETE(`Tất cả các sản phẩm liên quan 
            sẽ bị xóa và bạn không thể khôi phục hành động này.`)
        if (result.value) {
            console.log(_id)
            this.props.doDelete(_id).then(_ => {
                Swal.fire(
                    'Đã xóa!',
                    'Tất cả sản phẩm liên quan đã được xóa và không thể khôi phục lại được',
                    'success'
                )
            }).catch(error => console.log(error.message))
        }
    }
}

const ProductCategory = ({
    loading, openModal, modalAction, multipleExecuteLoading, formLoading,
    productCategoryList, totalPage, page,
    closeModal, getInsert,
    fetchAll, findById, doCreate, doUpdate, doExecute, doDelete
}) => {

    useEffect(() => {
        fetchAll().catch(error => { console.log(error.message) })

        const pusher = new Pusher('7853616a98fac75c9b66', {
            cluster: 'ap3',
            encrypted: true
        });
        const channel = pusher.subscribe('spring_reactjs-development');
        channel.bind('PRODUCT_CATEGORY', data => {
            fetchAll().catch(error => { console.log(error.message) })
        });
    }, [])

    return (
        <Main>
            <ProductCategoryHeader onClickNew={getInsert} />
            <ProductCategoryTable
                loading={loading}
                executeLoading={multipleExecuteLoading}
                body={productCategoryList}
                totalPages={totalPage}
                defaultActivePage={page}
                onExecute={doExecute}
                onView={findById}
                onDelete={doDelete}
                onChangePagination={_ => _}
            />
            <ProductCategoryModal />
        </Main>
    )
}

const mapStateToProps = ({ productCategoryReducer }) => ({
    ...productCategoryReducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
    closeModal,
	fetchAll, findById, getInsert, doExecute, doDelete
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductCategory)