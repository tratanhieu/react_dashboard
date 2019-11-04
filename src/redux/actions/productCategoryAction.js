import {
    REDUX_LOADING,
    REDUX_GET_ALL,
    REDUX_GET_ONE,
    REDUX_INSERT,
    REDUX_CLOSE_MODAL,
    REDUX_FORM_LOADING,
    REDUX_HANDLE_ERROR,
    REDUX_RESET_ERROR
} from '../../constants/redux-actions'
import { ACTIVE, HIDDEN } from '../../constants/entites';

export const loading = (loading) => ({
    type: REDUX_LOADING,
    loading
})

export const getALl = (data) => ({
    type: REDUX_GET_ALL,
    productCategoryList: data.listData,
    totalPage: data.totalPage,
    page: data.page
})

export const getOne = productCategory => ({
    type: REDUX_GET_ONE,
    productCategory
})

export const getInsert = _ => ({
    type: REDUX_INSERT,
    productCategory: {
        name: null,
        slug_name: null,
        status: ACTIVE
    }
})

export const handleError = (errors) => ({ type: REDUX_HANDLE_ERROR, errors })
export const resetError = () => ({ type: REDUX_RESET_ERROR })

export const closeModal = () => ({ type: REDUX_CLOSE_MODAL })
export const formLoading = formLoading => ({ type: REDUX_FORM_LOADING, formLoading })