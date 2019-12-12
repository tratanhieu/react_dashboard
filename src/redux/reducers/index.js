import { combineReducers } from 'redux'
import rootReducer from './rootReducer'
import productCategoryReducer from './productCategoryReducer'
import productBrandReducer from './productBrandReducer'
import userReducer from './userReducer'
import userGroupReducer from './userGroupReducer'
import saleManagementReducer from './saleManagementReducer'

export default combineReducers({
    rootReducer,
    productCategoryReducer,
    productBrandReducer,
    userReducer,
    userGroupReducer,
    saleManagementReducer
});
