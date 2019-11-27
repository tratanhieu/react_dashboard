import { REDUX_API_URL } from '../../constants/redux-actions'
import axios from 'axios'
import {
    REDUX_GET_ONE,
    REDUX_INSERT,
    REDUX_CLOSE_MODAL,
    REDUX_FORM_LOADING,
    REDUX_HANDLE_ERROR,
    REDUX_RESET_ERROR,
    REDUX_FILTER_BY_STATUS,
    REDUX_SORT,
    REDUX_SEARCH,
    REDUX_MODAL_SAVE_SUCCESS
} from '../../constants/redux-actions';
import { VIEW, INSERT, UPDATE } from '../../constants/pages';
import { ACTIVE } from '../../constants/entites';

const initialState = {
    loading: true,
    reload: false,
    modalFormSuccessMessage: '',
    filters: {
        search: '',
        status: '',
        orderBy: 'createDate,DESC'
    },
    mupltipleExecuteLoading: false,
    formLoading: false,
    openModal: false,
    modalAction: VIEW,
    productCategoryList: [],
    checkedItems: [],
    totalPages: 0,
    page: 1,
    productCategory: {
        status: ACTIVE
    },
    errors: []
}

const prefix = 'REDUX_PRODUCT_CATEGORY_'

const createAction = action => `${prefix}${action}`
const createActionSuccess = action => `${prefix}${action}_SUCCESS`
const createActionFail = action => `${prefix}${action}_FAIL`

const LIST_LOADING = createAction("LIST_LOADING")
const PREPARE_DATA = createAction("PREPARE_DATA")
const UPDATE_FILTERS = createAction("UPDATE_FILTERS")
const SET_CHECKED_ITEMS = createAction("SET_CHECKED_ITEMS")
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING")
const MODAL_FORM_GET_CREATE_ACTION = createAction("MODAL_FORM_GET_CREATE_ACTION")
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS")
const SET_PRODUCT_CATEGORY = createAction("SET_PRODUCT_CATEGORY")
const HANDLE_ERRORS = createAction("HANDLE_ERRORS")

// API
const PATH_PRODUCT_CATEGORY = `${REDUX_API_URL}/product/category`

const listLoading = loading => ({ type: LIST_LOADING, loading })
const prepareData = data => ({
    type: PREPARE_DATA,
    productCategoryList: data.listData,
    totalPage: data.totalPage,
    pageSize: data.pageSize,
    page: data.page
})
const resetError = () => ({ type: REDUX_RESET_ERROR })
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading })
const modalFormSuccessMessage = message => ({ type: MODAL_FORM_UPDATE_SUCCESS, message })

export const handleErrors = errors => ({ type: HANDLE_ERRORS, errors })
export const setProductCategory = productCategory => ({ type: SET_PRODUCT_CATEGORY, productCategory})

export const fetchWithPaginationAndFilter = (filters, page) => async dispatch => {
    dispatch(listLoading(true))
    return axios.get(`${PATH_PRODUCT_CATEGORY}?search=${filters.search}&status=${filters.status}&`
            + `sort=${filters.orderBy}&page=${page}`,
        { timeout: 5000 }
    ).then(response => dispatch(prepareData(response.data)))
    .catch(error => dispatch(handleErrors(error)))
}

export const doSave = productCategory => {
    return dispatch => {
        dispatch(resetError())
        dispatch(formLoading(true))
        const { product_category_id, name, slug_name, status } = productCategory

        if (!product_category_id) {
            dispatch(doCreate({ name, slug_name, status }))
        } else {
            dispatch(doUpdate({ product_category_id, name, slug_name, status }))
        }
    }
}

export const getCreateAction = () => ({ type: MODAL_FORM_GET_CREATE_ACTION })

const doCreate = productCategory => {
    return dispatch => {
        const params = JSON.stringify(productCategory)
        axios.post(`${PATH_PRODUCT_CATEGORY}/create`, params, {
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_ => {
            dispatch(modalFormSuccessMessage("Product Category is created successfully!!"))
            dispatch(setProductCategory({ ...initialState.productCategory }))
        }).catch(error => {
            dispatch(handleErrors(error.response.data))
        }).finally(_ => dispatch(formLoading(false)))
    }
}

const doUpdate = productCategory => {
    return dispatch => {
        const params = JSON.stringify(productCategory)
        return axios.post(
            `${PATH_PRODUCT_CATEGORY}/${productCategory.product_category_id}/update`,
            params,
            { timeout: 5000}
        ).catch(error => {
            dispatch(handleErrors(error.response.data))
        }).finally(_ => {
            // dispatch(loading(false))
        })
    }
}

export const setFilters = filters => ({ type: UPDATE_FILTERS, filters })
export const setCheckedItems = checkedItems => ({ type: SET_CHECKED_ITEMS, checkedItems })

export default function(state = initialState, action) {
    console.log(action.type)
    try {
        switch (action.type) {
            case LIST_LOADING: return {
                ...state,
                loading: action.loading
            }
            case MODAL_FORM_LOADING: return {
                ...state,
                formLoading: action.loading
            }
            case PREPARE_DATA: return {
                ...state,
                productCategoryList: action.productCategoryList,
                totalPage: action.totalPage,
                page: action.page,
                loading: false
            }
            case UPDATE_FILTERS: return {
                ...state,
                filters: action.filters
            }
            case SET_CHECKED_ITEMS: return {
                ...state,
                checkedItems: action.checkedItems
            }
            case MODAL_FORM_GET_CREATE_ACTION: return {
                ...state,
                productCategory: initialState.productCategory,
                openModal: true,
                modalFormSuccessMessage: initialState.modalFormSuccessMessage
            }
            case MODAL_FORM_UPDATE_SUCCESS: return {
                ...state,
                modalFormSuccessMessage: action.message
            }
            case SET_PRODUCT_CATEGORY: return {
                ...state,
                productCategory: action.productCategory
            }
            case HANDLE_ERRORS: return {
                ...state,
                errors: {
                    ...state.errors,
                    ...action.errors
                }
            }
            //
            case REDUX_GET_ONE: return {
                ...state,
                productCategory: action.productCategory,
                modalAction: UPDATE,
                openModal: true,
                loading: false
            }
            case REDUX_INSERT: return {
                ...state,
                productCategory: initialState.productCategory,
                modalAction: INSERT,
                openModal: true,
                loading: false
            }
            case REDUX_CLOSE_MODAL: return {
                ...state,
                productCategory: initialState.productCategory,
                openModal: false,
                errors: initialState.errors,
                modalFormSuccessMessage: initialState.modalFormSuccessMessage
            }
            case REDUX_FORM_LOADING: return {
                ...state,
                formLoading: action.formLoading,
                openModal: true
            }
            case REDUX_SEARCH: return {
                ...state,
                filters: {
                    ...state.filters,
                    search: action.value
                }
            }
            case REDUX_FILTER_BY_STATUS: return {
                ...state,
                filters: {
                    ...state.filters,
                    status: action.value
                }
            }
            case REDUX_SORT: return {
                ...state,
                filters: {
                    ...state.filters,
                    sort: action.value
                }
            }
            case REDUX_MODAL_SAVE_SUCCESS: return {
                ...state,
                filters: {
                    ...state.filters,
                    sort: action.value
                }
            }
            case REDUX_RESET_ERROR: return {
                ...state,
                errors: initialState.errors
            }
            default: return {
                ...state
            }
        }
    } catch (error) {
        console.log(error)
    } finally {
        
    }

    return state;
}