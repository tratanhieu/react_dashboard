import { combineReducers } from 'redux'
import rootReducer from './rootReducer'
import productReducer from './productReducer'
import productCategoryReducer from './productCategoryReducer'
import productTypeReducer from './productTypeReducer'
import productTypeGroupReducer from './productTypeGroupReducer'
import productBrandReducer from './productBrandReducer'
import userReducer from './userReducer'
import userGroupReducer from './userGroupReducer'
<<<<<<< HEAD
import promotionReducer from './promotionReducer'
=======
import saleManagementReducer from './saleManagementReducer'
import postReducer from './postReducer'
import postTypeReducer from './postTypeReducer'
import settingReducer from './settingReducer'
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62

export default combineReducers({
    rootReducer,
    productReducer,
    productCategoryReducer,
    productTypeReducer,
    productTypeGroupReducer,
    productBrandReducer,
    userReducer,
    userGroupReducer,
<<<<<<< HEAD
    promotionReducer
=======
    saleManagementReducer,
    postReducer,
    postTypeReducer,
    settingReducer
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
});
