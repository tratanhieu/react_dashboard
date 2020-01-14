import { REDUX_API_URL } from '../../constants/redux-actions'
import axios from 'axios'
import { ACTIVE } from '../../constants/entites';
import { handleErrors, resetSystemErrors } from './rootReducer';

const prefix = 'POST_'

export const initialState = {
    loading: true,
    reload: false,
    formSuccessMessage: '',
    filters: {
        search: '',
        status: '',
        sort: 'createDate,DESC'
    },
    multipleExecuteLoading: false,
    formLoading: false,
    openModal: false,
    postList: [],
    postTypeList: [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 }],
    checkedItems: [],
    totalPages: 0,
    page: 1,
    post: {
        status: ACTIVE
    },
    errors: {
        formErrors: {},
        errorMessage: ''
    }
}

const createAction = action => `${prefix}${action}`

const LIST_LOADING = createAction("LIST_LOADING")
const SET_ERRORS = createAction("SET_ERRORS")
const RELOAD = createAction("RELOAD")
const PREPARE_DATA = createAction("PREPARE_DATA")
const UPDATE_FILTERS = createAction("UPDATE_FILTERS")
const SET_CHECKED_ITEMS = createAction("SET_CHECKED_ITEMS")
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING")
const MODAL_FORM_GET_CREATE_ACTION = createAction("MODAL_FORM_GET_CREATE_ACTION")
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS")
const SET_POST = createAction("SET_POST")
const CLOSE_MODAL = createAction("CLOSE_MODAL")
const MULTIPLE_EXECUTE_LOADING = createAction("MULTIPLE_EXECUTE_LOADING")
const HANDLE_ERRORS = createAction("HANDLE_ERRORS")

// API
const PATH_POST = `${REDUX_API_URL}/post`

const listLoading = loading => ({ type: LIST_LOADING, loading })
const setErrors = errors => ({ type: SET_ERRORS, errors })
const prepareData = data => ({
    type: PREPARE_DATA,
    postList: data
})
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading })

const setMultipleExecuteLoading = loading => ({ type: MULTIPLE_EXECUTE_LOADING, loading })

const formSuccessMessage = message => ({ type: MODAL_FORM_UPDATE_SUCCESS, message })

export const setPost = post => ({ type: SET_POST, post })

export const closeModal = () => ({ type: CLOSE_MODAL })

export const doMultipleExecute = (listId, status) => async dispatch =>{
    const params = { listId, status }
    dispatch(resetSystemErrors())
    dispatch(setMultipleExecuteLoading(true))
    return axios.post(`${PATH_POST}/execute`, params, {
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(_ => dispatch(setCheckedItems([])))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(setMultipleExecuteLoading(false)))
}

export const fetchAll = () => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(listLoading(true))
    return axios.get(`${PATH_POST}`,
        { timeout: 5000 }
    )
    .then(response => dispatch(prepareData(response.data)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(listLoading(false)))
}

export const doSave = post => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(formLoading(true))
    const { postId, name, slugName, status } = post

    if (!postId) {
        dispatch(doCreate({ name, slugName, status }))
    } else {
        dispatch(doUpdate({ postId, name, slugName, status }))
    }
}

export const getCreateAction = () => ({ type: MODAL_FORM_GET_CREATE_ACTION })
export const getUpdateAction = postId => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(listLoading(true))
    return axios.get(`${PATH_POST}/${postId}`, {
        timeout: 5000
    }).then(response => dispatch(setPost(response.data)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(listLoading(false)))
}

const doCreate = post => async dispatch => {
    const params = JSON.stringify(post)
    axios.post(`${PATH_POST}/create`, params, {
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(_ => dispatch(formSuccessMessage("Product Category is created successfully!!")))
    .catch(error =>dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(formLoading(false)))
}

const doUpdate = post => async dispatch => {
    const params = JSON.stringify(post)
    return axios.post(
        `${PATH_POST}/${post.postId}/update`, params, { 
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(_ => dispatch(formSuccessMessage("Product Category is update successfully!!")))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(formLoading(false)))
}

export const setFilters = filters => ({ type: UPDATE_FILTERS, filters })
export const setCheckedItems = checkedItems => ({ type: SET_CHECKED_ITEMS, checkedItems })

export default function(state = initialState, action) {
    // console.log(action.type)
    try {
        switch (action.type) {
            case LIST_LOADING: return {
                ...state,
                loading: action.loading
            }
            case SET_ERRORS: return {
                ...state,
                errors: {
                    ...initialState.errors,
                    ...action.errors
                }
            }
            case RELOAD: return {
                ...state,
                reload: true
            }
            case MODAL_FORM_LOADING: return {
                ...state,
                formLoading: action.loading,
                errors: action.loading ? initialState.errors : state.errors
            }
            case MULTIPLE_EXECUTE_LOADING: return {
                ...state,
                multipleExecuteLoading: action.loading
            }
            case PREPARE_DATA: return {
                ...state,
                postList: action.postList,
                totalPage: action.totalPage,
                page: action.page,
                loading: false,
                reload: false
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
                post: initialState.post,
                openModal: true,
                formSuccessMessage: initialState.formSuccessMessage
            }
            case MODAL_FORM_UPDATE_SUCCESS: return {
                ...state,
                formSuccessMessage: action.message
            }
            case SET_POST: return {
                ...state,
                post: action.post
            }
            case CLOSE_MODAL: return {
                ...state,
                openModal: false,
                listLoading: false,
                post: initialState.post,
                formLoading: initialState.formLoading,
                errors: initialState.errors,
            }
            case HANDLE_ERRORS: return {
                ...state,
                errors: {
                    ...state.errors,
                    ...action.errors.response.data
                }
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