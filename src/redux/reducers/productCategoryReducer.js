import {
    REDUX_LOADING,
    REDUX_GET_ALL,
    REDUX_GET_ONE,
    REDUX_INSERT,
    REDUX_CLOSE_MODAL,
    REDUX_FORM_LOADING,
    REDUX_HANDLE_ERROR,
    REDUX_RESET_ERROR
} from '../../constants/redux-actions';
import { VIEW, INSERT, UPDATE } from '../../constants/pages';
import { ACTIVE } from '../../constants/entites';

const initialState = {
    loading: true,
    mupltipleExecuteLoading: false,
    formLoading: false,
    openModal: false,
    modalAction: VIEW,
    productCategoryList: [],
    totalPage: 0,
    page: 1,
    productCategory: {
        status: ACTIVE
    },
    errors: []
}

export default function(state = initialState, action) {
    console.log("Init Product Category")
    try {
        switch (action.type) {
            case REDUX_LOADING: return {
                ...state,
                loading: action.loading
            }

            case REDUX_GET_ALL: return {
                ...state,
                productCategoryList: action.productCategoryList,
                totalPage: action.totalPage,
                page: action.page,
                loading: false
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