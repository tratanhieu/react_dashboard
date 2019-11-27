import { HANDLE_SYSTEM_ERROR } from '../../constants/redux-actions'

export const initialState = {
    systemErrors: {
        message: '',
        detail: ''
    }
}

const SYSTEM_ERROR_MESSAGE = 'The system has an undefined error, please try again later.'

const RESET_SYSTEM_ERRORS = 'RESET_SYSTEM_ERRORS'

export const handleErrors = (errors = {}, pageErrorAction) => {
    if (errors.response) {
        if (errors.response.data) {
            return ({ type: pageErrorAction, errors })
        }
    }
    return ({ type: HANDLE_SYSTEM_ERROR })
}

export const resetSystemErrors = () => ({ type: RESET_SYSTEM_ERRORS })

export default function(state = initialState, action) {
    console.log(action.type)
    try {
        switch (action.type) {
            case HANDLE_SYSTEM_ERROR: return {
                ...state,
                systemErrors: {
                    message: SYSTEM_ERROR_MESSAGE,
                    detail: action.detail
                }
            }
            case RESET_SYSTEM_ERRORS: return {
                ...state,
                systemErrors: initialState.systemErrors
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