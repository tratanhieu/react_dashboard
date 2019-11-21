import { REDUX_API_URL } from '../../constants/redux-actions'
import axios from 'axios'
import {
    REDUX_LOADING,
    REDUX_GET_ALL,
    REDUX_GET_ONE,
    REDUX_INSERT,
    REDUX_CLOSE_MODAL,
    REDUX_FORM_LOADING,
    REDUX_HANDLE_ERROR,
    REDUX_RESET_ERROR,
    REDUX_RELOAD,
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
    checkAllItem: false,
    checkboxItems: [],
    totalPage: 0,
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
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING")
const HANDLE_ERROR = createAction("HANDLE_ERROR")
const GET_ALL = createAction("GET_ALL")

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

const handleErrors = errors => ({ type: HANDLE_ERROR, errors })

export const fetchWithPagination = page => dispatch => {
    dispatch(listLoading(true))
    return axios.get(`${PATH_PRODUCT_CATEGORY}${page ? `?page=${page}` : ''}`, {
        timeout: 5000
    })
    .then(response => dispatch(prepareData(response.data)))
    .catch(error => dispatch(handleErrors(error)))
}

export default function(state = initialState, action) {
    console.log(action.type)
    try {
        switch (action.type) {
            case LIST_LOADING: return {
                ...state,
                loading: action.loading
            }
            case REDUX_RELOAD: return {
                ...state,
                checkboxItems: action.checkboxItems,
                reload: true
            }
            case PREPARE_DATA: {
                const checkboxItems = state.reload ? state.checkboxItems : []
                return {
                    ...state,
                    productCategoryList: action.productCategoryList,
                    totalPage: action.totalPage,
                    page: action.page,
                    checkAllItem: checkboxItems.length === action.productCategoryList.length,
                    checkboxItems,
                    loading: false,
                    reload: false
                }
            }
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
                errors: initialState.errors
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
            case REDUX_HANDLE_ERROR: return {
                ...state,
                errors: {
                    ...state.errors,
                    ...action.errors
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