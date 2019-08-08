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
            dispatch(getALl(response.data.productTypes,
                response.data.totalPage,
                response.data.page))
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
            console.log(response)
            dispatch(getOne(response.data.productType))
        }
        ).catch(error => {
            return Promise.reject("Có lỗi xãy ra trong quá trình truy vấn dữ liệu, vui lòng thử lại sau")
        })
    }
}

export const create = (productType) => {
    return (dispatch) => {
        dispatch(getLoading(true))
        return axios.post(`${REDUX_API_URL}${PREFIX}/product_type/create`, {productType}, {
            timeout: 5000
        }).then(response => 
            dispatch(getALl(response.data.productTypes,
                response.data.totalPage,
                response.data.page))
        ).catch(error => {
            return Promise.reject("Có lỗi xãy ra, vui lòng thử lại sau")
        })
    }
}