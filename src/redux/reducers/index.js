import { combineReducers } from 'redux'
import rootReducer from './rootReducer'
import productCategoryReducer from './productCategoryReducer'
import userReducer from './userReducer'
import userGroupReducer from './userGroupReducer'

export default combineReducers({
    rootReducer,
    productCategoryReducer,
    userReducer,
    userGroupReducer
});
