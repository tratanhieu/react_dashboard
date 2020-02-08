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
import postReducer from './postReducer'
import postTypeReducer from './postTypeReducer'
import settingReducer from './settingReducer'

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
    postReducer,
    postTypeReducer,
    settingReducer
});
