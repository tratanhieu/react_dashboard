import { loading, prepareData, getOne, handleError, formLoading, resetError, closeModal } from '../actions/productCategoryAction'
import { REDUX_API_URL } from '../../constants/redux-actions'
import axios from 'axios'
import { ALERT_SUCCESS } from '../../commons/sweet-alert-modal';
import { INSERT, UPDATE } from '../../constants/pages';

const PREFIX = 'product'

export const fetchAll = page => {
    return (dispatch) => {
        dispatch(loading(true))
        return axios.get(`${REDUX_API_URL}${PREFIX}/category${page ? `?page=${page}` : ''}`, {
            timeout: 5000
        }).then(response => {
            dispatch(prepareData(response.data))
        }
        ).catch(error => {
            return 
        })
    }
}

export const findById = _id => {
    return (dispatch) => {
        dispatch(loading(true))
        return axios.get(`${REDUX_API_URL}${PREFIX}/category/${_id}`, {
            timeout: 5000
        }).then(response => {
            dispatch(getOne(response.data))
        }).catch(error => {
            return Promise.reject(error.message)
        })
    }
}

export const doSave = productCategory => {
    return dispatch => {
        dispatch(resetError())
        dispatch(formLoading(true))
        const { product_category_id, name, slug_name, status } = productCategory

        if (!product_category_id) {
            dispatch(doCreate({
                name, slug_name, status
            }))
        } else {
            dispatch(doUpdate({
                product_category_id, name, slug_name, status
            }))
        }
    }
}

export const doExecute = (list_id, status, page) => {
    return (dispatch) => {
        dispatch(loading(true))
        const params = {
            list_id,
            status
        }
        return axios.post(`${REDUX_API_URL}${PREFIX}/category/execute`, params, {
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            return Promise.reject(error)
        })
    }
}

export const doDelete = productCategoryId => {
    return (dispatch) => {
        dispatch(loading(true))
        return axios.get(`${REDUX_API_URL}${PREFIX}/category/${productCategoryId}/delete`, {
            timeout: 5000
        }).catch(error => {
            return Promise.reject(error)
        })
    }
}

export const onPageChange = page => {
    return dispatch => {
        dispatch(fetchAll(page))
    }
}

export const onUpdateFilters = filters => {
    return dispatch => {
        dispatch(fetchWithFilter(filters))
    }
}

const fetchWithFilter = filters => {
    return dispatch => {
        dispatch(loading(true))
        return axios.get(`${REDUX_API_URL}${PREFIX}/category?search=${filters.search}&status=${filters.status}&sort=${filters.orderBy}`, {
            timeout: 5000
        }).then(response => {
            dispatch(prepareData(response.data))
        }
        ).catch(error => {
            return 
        })
    }
}

const doCreate = (productCategory) => {
    return (dispatch) => {
        const params = JSON.stringify(productCategory)

        axios.post(`${REDUX_API_URL}${PREFIX}/category/create`, params, {
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_ => {
            ALERT_SUCCESS("Đã thêm thành công Danh mục sản phẩm").then(_ => dispatch(closeModal()))
        }).catch(error => {
            dispatch(handleError(error.response.data))
        }).finally(_ => dispatch(formLoading(false)))
    }
}

const doUpdate = (productCategory) => {
    return (dispatch) => {
        const params = JSON.stringify(productCategory)
        return axios.post(
            `${REDUX_API_URL}${PREFIX}/category/${productCategory.product_category_id}/update`,
            params,
            { timeout: 5000}
        ).catch(error => {
            return Promise.reject("Có lỗi xãy ra, vui lòng thử lại sau")
        }).finally(_ => {
            dispatch(loading(false))
        })
    }
}