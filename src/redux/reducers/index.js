import { combineReducers } from 'redux'
import rootReducer from './rootReducer'
import productReducer from './productReducer'
import productCategoryReducer from './productCategoryReducer'
import productTypeReducer from './productTypeReducer'
import productTypeGroupReducer from './productTypeGroupReducer'
import productBrandReducer from './productBrandReducer'
import userReducer from './userReducer'
import userGroupReducer from './userGroupReducer'
import saleManagementReducer from './saleManagementReducer'
import guestReducer from './guestReducer'

export default combineReducers({
    rootReducer,
    productReducer,
    productCategoryReducer,
    productTypeReducer,
    productTypeGroupReducer,
    productBrandReducer,
    userReducer,
    userGroupReducer,
    saleManagementReducer,
    guestReducer
});
