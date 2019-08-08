import { REDUX_LOADING, REDUX_GET_ALL, REDUX_GET_ONE } from '../../constants/redux-actions'

export const getLoading = (loading) => ({
    type: REDUX_LOADING,
    loading
})

export const getALl = (productTypes, totalPage, page) => ({
    type: REDUX_GET_ALL,
    productTypes,
    totalPage,
    page
})

export const getOne = productType => ({
    type: REDUX_GET_ONE,
    productType
})