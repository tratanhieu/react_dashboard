import { REDUX_LOADING, REDUX_GET_ALL, REDUX_GET_ONE, REDUX_INSERT } from '../../constants/redux-actions'
import { ACTIVE } from '../../constants/entites';

export const getLoading = (loading) => ({
    type: REDUX_LOADING,
    loading
})

export const getALl = (data) => ({
    type: REDUX_GET_ALL,
    productTypes: data.productTypes,
    totalPage: data.totalPage,
    page: data.page
})

export const getOne = productType => ({
    type: REDUX_GET_ONE,
    productType
})

export const getInsert = () => ({
    type: REDUX_INSERT,
    productType: {
        name: null,
        status: ACTIVE
    }
})