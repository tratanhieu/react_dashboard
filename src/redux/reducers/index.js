import { combineReducers } from 'redux'
import rootReducer from './rootReducer'
import productCategoryReducer from './productCategoryReducer'
import productBrandReducer from './productBrandReducer'

export default combineReducers({
    rootReducer,
    productCategoryReducer,
    productBrandReducer
});
