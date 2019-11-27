import { combineReducers } from 'redux'
import rootReducer from './rootReducer'
import productCategoryReducer from './productCategoryReducer'

export default combineReducers({
    rootReducer,
    productCategoryReducer
});
