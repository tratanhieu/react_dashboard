import axios from '../axios'
import { handleErrors } from './rootReducer';

export const initialState = {
    formLoading: false,
    userProfileForm: {},
    changePasswordForm: {},
    errors: {
        formErrors: {},
        errorMessage: ''
    }
}

const PATH_API_USER = 'user'
const createAction = action => `SETTING_${action}`

const SET_USER_PROFILE_FORM = createAction("SET_USER_PROFILE_FORM")
export const setUserProfileForm = userProfileForm => ({ type: SET_USER_PROFILE_FORM, userProfileForm })

const SET_CHANGE_PASSWORD_FORM = createAction("SET_CHANGE_PASSWORD_FORM")
export const setChangePasswordForm = changePasswordForm => ({ type: SET_CHANGE_PASSWORD_FORM, changePasswordForm })

const SET_FORM_LOADING = createAction("SET_FORM_LOADING")
const setFormLoading = loading => ({ type: SET_FORM_LOADING, loading })

const SET_INIT_USER_PROFILE = createAction("SET_INIT_USER_PROFILE")
const setInitUserProfile = ({ userProfile, provinceList }) => ({ type: SET_INIT_USER_PROFILE, userProfile, provinceList })
export const getUserProfile = () => dispatch => {
    dispatch(setFormLoading(true))
    return axios.get(`${PATH_API_USER}/profile`, {},{
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        dispatch(setInitUserProfile(response.data))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(setFormLoading(false)))
}

const HANDLE_ERRORS = createAction("HANDLE_ERRORS")
export default function(state = initialState, action) {
    try {
        switch (action.type) {
            case SET_FORM_LOADING: return {
                ...state,
                formLoading: action.loading
            }
            case HANDLE_ERRORS: return {
                ...state,
                errors: {
                    ...initialState.errors,
                    ...action.errors
                }
            }
            case SET_INIT_USER_PROFILE: {
                let userProfileForm = action.userProfile
                const provinceListObject = action.provinceList
                userProfileForm.province = {
                    provinceId: userProfileForm.provinceId,
                    name: provinceListObject[userProfileForm.provinceId]
                }
                return {
                    ...state,
                    userProfileForm,
                    provinceList: Object.keys(provinceListObject).map(provinceId => (
                        {
                            provinceId,
                            name: provinceListObject[provinceId]
                        }
                    ))
                }
            }
            case SET_USER_PROFILE_FORM: return {
                ...state,
                userProfileForm: action.userProfileForm
            }
            case SET_CHANGE_PASSWORD_FORM: return {
                ...state,
                changePasswordForm: action.changePasswordForm
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