import { HANDLE_SYSTEM_ERROR } from '../../constants/redux-actions'
import axios from '../axios'
import cookie from 'js-cookie'

export const initialState = {
    formLoading: false,
    loginForm: {},
    userAuth: {
        token: ''
    },
    systemErrors: {
        message: '',
        detail: ''
    },
    errors: {
        formErrors: {},
        errorMessage: ''
    },
    systemPopup: {
        open: false,
        type: 'success',
        message: ''
    }
}

const PATH_API_LOGIN = 'user/login'
const createAction = action => `SYSTEM_${action}`

const SYSTEM_ERROR_MESSAGE = 'The system has an undefined error, please try again later.'

const RESET_SYSTEM_ERRORS = 'RESET_SYSTEM_ERRORS'
const SET_SYSTEM_POPUP = 'SET_SYSTEM_POPUP'

export const reload = pageName => ({ type: `${pageName}_RELOAD` })

const SET_LOGIN_FORM = createAction("SET_LOGIN_FORM")
export const setLoginForm = loginForm => ({ type: SET_LOGIN_FORM, loginForm })

const SET_FORM_LOADING = createAction("SET_FORM_LOADING")
const setFormLoading = loading => ({ type: SET_FORM_LOADING, loading })

const SET_USER_AUTH = createAction("SET_USER_AUTH")
export const setUserAuth = userAuth => ({ type: SET_USER_AUTH, userAuth })

export const doLogin = params => dispatch => {
    dispatch(setFormLoading(true))
    return axios.post(PATH_API_LOGIN, params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        cookie.set("USER_TOKEN", response.data.token)
        dispatch(setUserAuth(response.data))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(setFormLoading(false)))
}

const HANDLE_ERRORS = createAction("HANDLE_ERRORS")
export const handleErrors = (errors = {}) => {
    if (errors.response) {
        if (errors.response.data) {
            return ({ type: HANDLE_ERRORS, errors })
        }
    }
    return ({ type: HANDLE_SYSTEM_ERROR })
}

export const openSystemPopup = (open, message, typePopup = 'success') => {
    return ({ type: SET_SYSTEM_POPUP, open, message, typePopup })
}

export const resetSystemErrors = () => ({ type: RESET_SYSTEM_ERRORS })

export default function(state = initialState, action) {
    try {
        switch (action.type) {
            case SET_FORM_LOADING: return {
                ...state,
                formLoading: action.loading
            }
            case HANDLE_SYSTEM_ERROR: return {
                ...state,
                systemErrors: {
                    message: SYSTEM_ERROR_MESSAGE,
                    detail: action.detail
                }
            }
            case HANDLE_ERRORS: return {
                ...state,
                errors: {
                    ...initialState.errors,
                    ...action.errors
                }
            }
            case RESET_SYSTEM_ERRORS: return {
                ...state,
                systemErrors: initialState.systemErrors
            }
            case SET_USER_AUTH: return {
                ...state,
                userAuth: action.userAuth
            }
            case SET_LOGIN_FORM: return {
                ...state,
                loginForm: action.loginForm
            }
            case SET_SYSTEM_POPUP: return {
                ...state,
                systemPopup: {
                    open: action.open,
                    type: action.typePopup,
                    message: action.message
                }
            }
            default: return {
                ...state
            }
        }
    } catch (error) {
        console.log(error)
    }

    return state;
}