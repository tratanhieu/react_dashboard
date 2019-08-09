import { REDUX_LOADING, REDUX_GET_ALL, REDUX_GET_ONE, REDUX_INSERT } from '../../constants/redux-actions';

const initialState = {
    loading: true,
    productTypes: [],
    totalPage: 0,
    page: 1,
    productType: {}
}

export default function(state = initialState, action) {
    try {
        switch (action.type) {
            case REDUX_LOADING: return {
                    ...state,
                    loading: action.loading
                }

            case REDUX_GET_ALL: return {
                    ...state,
                    productTypes: action.productTypes,
                    totalPage: action.totalPage,
                    page: action.page,
                    loading: false
                }

            case REDUX_GET_ONE: return {
                    ...state,
                    productType: action.productType,
                    loading: false
                }

            case REDUX_INSERT: return {
                    ...state,
                    productType: action.productType,
                    loading: false
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