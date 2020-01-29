import { REDUX_API_URL } from '../../constants/redux-actions'
import axios from 'axios'
import { ACTIVE } from '../../constants/entites';
import { handleErrors, resetSystemErrors } from './rootReducer';

const prefix = 'USER_GROUP_'

export const initialState = {
    loading: true,
    reload: false,
    modalFormSuccessMessage: '',
    filters: {
        search: '',
        status: '',
        sort: 'createDate,DESC'
    },
    multipleExecuteLoading: false,
    formLoading: false,
    openModal: false,
    userGroupList: [],
    checkedItems: [],
    totalPages: 0,
    page: 1,
    userGroup: {
        status: ACTIVE
    },
    errors: {
        formErrors: {},
        errorMessage: ''
    }
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
const SET_PRODUCT_CATEGORY = createAction("SET_PRODUCT_CATEGORY")
const CLOSE_MODAL = createAction("CLOSE_MODAL")
const MULTIPLE_EXECUTE_LOADING = createAction("MULTIPLE_EXECUTE_LOADING")
const HANDLE_ERRORS = createAction("HANDLE_ERRORS")

// API
const API_PATH = `${REDUX_API_URL}/user/group`

const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal })
const listLoading = loading => ({ type: LIST_LOADING, loading })
const prepareData = data => ({
    type: PREPARE_DATA,
    userGroupList: data
})
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading })

const setMultipleExecuteLoading = loading => ({ type: MULTIPLE_EXECUTE_LOADING, loading })

const setUserGroup = (userGroup, openModal) => ({ type: SET_PRODUCT_CATEGORY, userGroup, openModal})

const modalFormSuccessMessage = message => ({ type: MODAL_FORM_UPDATE_SUCCESS, message })

export const closeModal = () => ({ type: CLOSE_MODAL })

export const doMultipleExecute = (listId, status) => async dispatch =>{
    const params = { listId, status }
    dispatch(resetSystemErrors())
    dispatch(setMultipleExecuteLoading(true))
    return axios.post(`${API_PATH}/execute`, params, {
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
    return axios.get(API_PATH,
        { timeout: 5000 }
    )
    .then(response => dispatch(prepareData(response.data)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(listLoading(false)))
}

export const doSave = userGroup => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(modalFormSuccessMessage(""))
    dispatch(formLoading(true))
    const { userGroupId, name, userGroupFeatures , status } = userGroup
    const params = { name, userGroupFeatures, status }
    if (!userGroupId) {
        dispatch(doCreate(params))
    } else {
        dispatch(doUpdate({ ...params, userGroupId }))
    }
}

export const getCreateAction = () => ({ type: MODAL_FORM_GET_CREATE_ACTION })
export const getUpdateAction = userGroupId => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(modalFormSuccessMessage(""))
    dispatch(listLoading(true))
    return axios.get(`${API_PATH}/${userGroupId}`, {
        timeout: 5000
    }).then(response => {
        dispatch(setUserGroup(response.data))
        dispatch(setOpenModal(true))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(listLoading(false)))
}

const doCreate = userGroup => async dispatch => {
    const params = JSON.stringify(userGroup)
    axios.post(API_PATH, params, {
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        dispatch(prepareData(response.data))
        dispatch(setUserGroup(initialState.userGroup))
        dispatch(modalFormSuccessMessage("User Group is created successfully!!"))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)))
}

const doUpdate = userGroup => async dispatch => {
    const params = JSON.stringify(userGroup)
    return axios.patch(API_PATH, params, { 
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        dispatch(prepareData(response.data))
        dispatch(setUserGroup(initialState.userGroup))
        dispatch(modalFormSuccessMessage("User Group is update successfully!!"))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)))
}

export const setFilters = filters => ({ type: UPDATE_FILTERS, filters })
export const setCheckedItems = checkedItems => ({ type: SET_CHECKED_ITEMS, checkedItems })

export default function(state = initialState, action) {
    console.log(action.type, action)
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
            case OPEN_MODAL: return {
                ...state,
                openModal: action.openModal
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
                userGroupList: action.userGroupList,
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
                userGroup: initialState.userGroup,
                openModal: true,
                modalFormSuccessMessage: initialState.modalFormSuccessMessage
            }
            case MODAL_FORM_UPDATE_SUCCESS: return {
                ...state,
                modalFormSuccessMessage: action.message
            }
            case SET_PRODUCT_CATEGORY: return {
                ...state,
                userGroup: action.userGroup,
                openModal: action.openModal,
                modalFormSuccessMessage: initialState.modalFormSuccessMessage
            }
            case CLOSE_MODAL: return {
                ...state,
                openModal: false,
                listLoading: false,
                userGroup: initialState.userGroup,
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