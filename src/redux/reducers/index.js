import { combineReducers } from 'redux'
import rootReducer from './rootReducer'
import productCategoryReducer from './productCategoryReducer'
import productTypeReducer from './productTypeReducer'
import productTypeGroupReducer from './productTypeGroupReducer'
import productBrandReducer from './productBrandReducer'
import userReducer from './userReducer'
import userGroupReducer from './userGroupReducer'

export default combineReducers({
    rootReducer,
    productCategoryReducer,
    productTypeReducer,
    productTypeGroupReducer,
    productBrandReducer,
    userReducer,
    userGroupReducer
});
