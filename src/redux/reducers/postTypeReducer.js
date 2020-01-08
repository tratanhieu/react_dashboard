import { REDUX_API_URL } from '../../constants/redux-actions'
import axios from 'axios'
import { ACTIVE, HIDDEN, ALL } from '../../constants/entites';
import { handleErrors, resetSystemErrors } from './rootReducer';

const prefix = 'POST_TYPE_'

export const initialState = {
    loading: true,
    reload: false,
    modalFormSuccessMessage: '',
    filters: {
        status: ALL
    },
    multipleExecuteLoading: false,
    formLoading: false,
    openModal: false,
    postTypeList: [],
    checkedItems: [],
    totalPages: 0,
    page: 1,
    postType: {
        status: ACTIVE
    },
    errors: {}
}

const createAction = action => `${prefix}${action}`

const LIST_LOADING = createAction("LIST_LOADING")
const OPEN_MODAL = createAction("OPEN_MODAL")
const RELOAD = createAction("RELOAD")
const PREPARE_DATA = createAction("PREPARE_DATA")
const UPDATE_FILTERS = createAction("UPDATE_FILTERS")
const SET_CHECKED_ITEMS = createAction("SET_CHECKED_ITEMS")
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING")
const MODAL_FORM_GET_CREATE_ACTION = createAction("MODAL_FORM_GET_CREATE_ACTION")
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS")
const SET_POST_TYPE = createAction("SET_POST_TYPE")
const CLOSE_MODAL = createAction("CLOSE_MODAL")
const MULTIPLE_EXECUTE_LOADING = createAction("MULTIPLE_EXECUTE_LOADING")
const HANDLE_ERRORS = createAction("HANDLE_ERRORS")

// API
const PATH_POST_TYPE = `${REDUX_API_URL}/post/type`

const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal })
const listLoading = loading => ({ type: LIST_LOADING, loading })
const prepareData = data => ({
    type: PREPARE_DATA,
    postTypeList: data
})
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading })

const setMultipleExecuteLoading = loading => ({ type: MULTIPLE_EXECUTE_LOADING, loading })

const modalFormSuccessMessage = message => ({ type: MODAL_FORM_UPDATE_SUCCESS, message })

export const setPostType = postType => ({ type: SET_POST_TYPE, postType })

export const closeModal = () => ({ type: CLOSE_MODAL })

export const doMultipleExecute = (listId, status) => async dispatch =>{
    const params = { listId, status }
    dispatch(resetSystemErrors())
    dispatch(setMultipleExecuteLoading(true))
    return axios.post(`${PATH_POST_TYPE}/execute`, params, {
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
    return axios.get(`${PATH_POST_TYPE}`,
        { timeout: 5000 }
    )
    .then(response => dispatch(prepareData(response.data)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(listLoading(false)))
}

export const doSave = postType => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(formLoading(true))
    dispatch(modalFormSuccessMessage(""))
    const { postTypeId, name, slugName, status } = postType
    const active = status ? ACTIVE : HIDDEN
    if (!postTypeId) {
        dispatch(doCreate({ name, slugName, status: active }))
    } else {
        dispatch(doUpdate({ postTypeId, name, slugName, status: active }))
    }
}

export const getCreateAction = () => ({ type: MODAL_FORM_GET_CREATE_ACTION })
export const getUpdateAction = postTypeId => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(listLoading(true))
    return axios.get(`${PATH_POST_TYPE}/${postTypeId}`, {
        timeout: 5000
    }).then(response => {
        dispatch(setPostType(response.data))
        dispatch(setOpenModal(true))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(listLoading(false)))
}

const doCreate = postType => async dispatch => {
    const params = JSON.stringify(postType)
    axios.post(`${PATH_POST_TYPE}/create`, params, {
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(_ => {
        dispatch(modalFormSuccessMessage("Post Type is created successfully!!"))
        dispatch(setPostType(initialState.postType))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(formLoading(false)))
}

const doUpdate = postType => async dispatch => {
    const params = JSON.stringify(postType)
    return axios.post(
        `${PATH_POST_TYPE}/${postType.postTypeId}/update`, params, { 
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(_ => dispatch(modalFormSuccessMessage("Product Category is update successfully!!")))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(formLoading(false)))
}

export const doFilters = filters => ({ type: UPDATE_FILTERS, filters })
export const setCheckedItems = checkedItems => ({ type: SET_CHECKED_ITEMS, checkedItems })

export default function(state = initialState, action) {
    // console.log(action.type)
    try {
        switch (action.type) {
            case LIST_LOADING: return {
                ...state,
                loading: action.loading
            }
            case RELOAD: return {
                ...state,
                reload: true
            }
            case MODAL_FORM_LOADING: return {
                ...state,
                formLoading: action.loading
            }
            case MULTIPLE_EXECUTE_LOADING: return {
                ...state,
                multipleExecuteLoading: action.loading
            }
            case PREPARE_DATA: return {
                ...state,
                postTypeList: action.postTypeList,
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
                postType: initialState.postType,
                openModal: true,
                modalFormSuccessMessage: initialState.modalFormSuccessMessage
            }
            case MODAL_FORM_UPDATE_SUCCESS: return {
                ...state,
                modalFormSuccessMessage: action.message
            }
            case SET_POST_TYPE: return {
                ...state,
                postType: action.postType
            }
            case OPEN_MODAL: return {
                ...state,
                openModal: action.openModal
            }
            case CLOSE_MODAL: return {
                ...state,
                openModal: false,
                listLoading: false,
                postType: initialState.postType,
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