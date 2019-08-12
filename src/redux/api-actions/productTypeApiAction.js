import { getLoading, getALl, getOne } from '../actions/productTypeAction'
import { REDUX_API_URL, DISMISS } from '../../constants/redux-actions'
import axios from 'axios'

const PREFIX = 'product'

export const fetchAll = (page) => {
    return (dispatch) => {
        dispatch(getLoading(true))
        return axios.get(`${REDUX_API_URL}${PREFIX}/product_type${page ? `?page=${page}` : ''}`, {
            timeout: 5000
        }).then(response => 
            dispatch(getALl(response.data))
        ).catch(error => {
            return Promise.reject("Có lỗi xãy ra trong quá trình truy vấn dữ liệu, vui lòng thử lại sau")
        })
    }
}

export const findById = (_id) => {
    return (dispatch) => {
        dispatch(getLoading(true))
        return axios.get(`${REDUX_API_URL}${PREFIX}/product_type${_id ? `?id=${_id}` : ''}`, {
            timeout: 5000
        }).then(response => {
            dispatch(getOne(response.data.productType))
        }
        ).catch(error => {
            return Promise.reject("Có lỗi xãy ra trong quá trình truy vấn dữ liệu, vui lòng thử lại sau")
        })
    }
}

export const doCreate = (productType) => {
    return (dispatch) => {
        const params = {
            name: productType.name,
            status: productType.status
        }
        dispatch(getLoading(true))
        return axios.post(`${REDUX_API_URL}${PREFIX}/product_type/create`, params, {
            timeout: 5000
        }).then(response => 
            dispatch(getALl(response.data))
        ).catch(error => {
            return Promise.reject("Có lỗi xãy ra, vui lòng thử lại sau")
        })
    }
}

export const doUpdate = (productType, page) => {
    return (dispatch) => {
        dispatch(getLoading(true))
        const params = {
            _id: productType._id,
            name: productType.name,
            status: productType.status,
            page
        }
        return axios.put(`${REDUX_API_URL}${PREFIX}/product_type/update`, params, {
            timeout: 5000
        }).then(response => 
            dispatch(getALl(response.data))
        ).catch(error => {
            return Promise.reject("Có lỗi xãy ra, vui lòng thử lại sau")
        })
    }
}

export const doExecute = (listId, status, page) => {
    return (dispatch) => {
        dispatch(getLoading(true))
        const params = {
            listId,
            status,
            page
        }
        return axios.put(`${REDUX_API_URL}${PREFIX}/product_type/update_status`, params, {
            timeout: 5000
        }).then(response => 
            dispatch(getALl(response.data))
        ).catch(error => {
            return Promise.reject(error)
        })
    }
}