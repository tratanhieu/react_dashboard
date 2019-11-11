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
    REDUX_CHANGE_CHECK_ITEM,
    REDUX_CHANGE_CHECK_ALL_ITEM
} from '../../constants/redux-actions';
import { VIEW, INSERT, UPDATE } from '../../constants/pages';
import { ACTIVE } from '../../constants/entites';

const initialState = {
    loading: true,
    reload: false,
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

export default function(state = initialState, action) {
    try {
        switch (action.type) {
            case REDUX_LOADING: return {
                ...state,
                loading: action.loading
            }
            case REDUX_RELOAD: return {
                ...state,
                checkboxItems: action.checkboxItems,
                reload: true
            }
            case REDUX_GET_ALL: {
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
                productCategory: action.productCategory,
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
            case REDUX_CHANGE_CHECK_ALL_ITEM: {
                state.checkboxItems.forEach((_, key, map) => map.set(key, action.checked))
                return {
                    ...state,
                    checkAllItem: action.checked
                }
            }
            case REDUX_CHANGE_CHECK_ITEM: {
                // let checkAllItem = true
                let checkboxItems = state.checkboxItems
                checkboxItems.forEach((_, key, map) => {
                    if (key === action.item) {
                        checkboxItems.set(key, action.checked)
                    }
                    // if (item === false) {
                    //     checkAllItem = false
                    //     return false
                    // }
                })
                return {
                    ...state,
                    checkAllItem: true
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