// import { REDUX_API_URL } from '../../constants/redux-actions'
// import axios from 'axios'
// import { ACTIVE } from '../../constants/entites';
// import { handleErrors, resetSystemErrors } from './rootReducer';

// // API
// const URL_PATH = `${REDUX_API_URL}/product/category`

// const prefix = 'PRODUCT_CATEGORY_'

// export const initialState = {
//     loading: true,
//     reload: false,
//     modalFormSuccessMessage: '',
//     filters: {
//         search: '',
//         status: '',
//         sort: 'createDate,DESC'
//     },
//     multipleExecuteLoading: false,
//     formLoading: false,
//     openModal: false,
//     productCategoryList: [],
//     checkedItems: [],
//     totalPages: 0,
//     page: 1,
//     productCategory: {
//         status: ACTIVE
//     },
//     errors: {
//         name: ''
//     }
// }

// const createAction = action => `${prefix}${action}`

// const LIST_LOADING = createAction("LIST_LOADING")
// const RELOAD = createAction("RELOAD")
// const PREPARE_DATA = createAction("PREPARE_DATA")
// const UPDATE_FILTERS = createAction("UPDATE_FILTERS")
// const SET_CHECKED_ITEMS = createAction("SET_CHECKED_ITEMS")
// const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING")
// const MODAL_FORM_GET_CREATE_ACTION = createAction("MODAL_FORM_GET_CREATE_ACTION")
// const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS")
// const SET_PRODUCT_CATEGORY = createAction("SET_PRODUCT_CATEGORY")
// const CLOSE_MODAL = createAction("CLOSE_MODAL")
// const MULTIPLE_EXECUTE_LOADING = createAction("MULTIPLE_EXECUTE_LOADING")
// const HANDLE_ERRORS = createAction("HANDLE_ERRORS")

// const listLoading = loading => ({ type: LIST_LOADING, loading })
// const prepareData = ({ listData: productCategoryList, totalPage, pageSize, page }) => ({
//     type: PREPARE_DATA,
//     productCategoryList,
//     totalPage,
//     pageSize,
//     page
// })
// const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading })

// const setMultipleExecuteLoading = loading => ({ type: MULTIPLE_EXECUTE_LOADING, loading })

// const setProductCategory = (productCategory, openModal) => ({ type: SET_PRODUCT_CATEGORY, productCategory, openModal})

// const modalFormSuccessMessage = message => ({ type: MODAL_FORM_UPDATE_SUCCESS, message })

// const doCreate = productCategory => async dispatch => {
//     const params = JSON.stringify(productCategory)
//     axios.post(`${URL_PATH}/create`, params, {
//         timeout: 5000,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(_ => dispatch(modalFormSuccessMessage("Product Category is created successfully!!")))
//     .catch(error =>dispatch(handleErrors(error, HANDLE_ERRORS)))
//     .finally(_ => dispatch(formLoading(false)))
// }

// const doUpdate = productCategory => async dispatch => {
//     const params = JSON.stringify(productCategory)
//     return axios.post(
//         `${URL_PATH}/${productCategory.productCategoryId}/update`, params, { 
//             timeout: 5000,
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//     ).then(_ => dispatch(modalFormSuccessMessage("Product Category is update successfully!!")))
//     .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
//     .finally(_ => dispatch(formLoading(false)))
// }

// const updateFilters = filters => ({ type: UPDATE_FILTERS, filters })

// export const doMultipleExecute = (listId, status) => async dispatch =>{
//     const params = { listId, status }
//     dispatch(resetSystemErrors())
//     dispatch(setMultipleExecuteLoading(true))
//     return axios.post(`${URL_PATH}/execute`, params, {
//         timeout: 5000,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(_ => dispatch(setCheckedItems([])))
//     .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
//     .finally(_ => dispatch(setMultipleExecuteLoading(false)))
// }

// export const fetchWithPaginationAndFilter = (filters, page) => async dispatch => {
//     // console.log(filters, page)
//     dispatch(resetSystemErrors())
//     dispatch(listLoading(true))
//     return axios.get(`${URL_PATH}?search=${filters.search}&status=${filters.status}&`
//             + `sort=${filters.sort}&page=${page}`,
//         { timeout: 5000 }
//     )
//     .then(response => dispatch(prepareData(response.data, filters)))
//     .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
//     .finally(_ => dispatch(listLoading(false)))
// }

// export const doSave = productCategory => async dispatch => {
//     dispatch(resetSystemErrors())
//     dispatch(formLoading(true))
//     const { productCategoryId, name, slugName, status } = productCategory

//     if (!productCategoryId) {
//         dispatch(doCreate({ name, slugName, status }))
//     } else {
//         dispatch(doUpdate({ productCategoryId, name, slugName, status }))
//     }
// }

// export const getCreateAction = () => ({ type: MODAL_FORM_GET_CREATE_ACTION })
// export const getUpdateAction = productCategoryId => async dispatch => {
//     dispatch(resetSystemErrors())
//     dispatch(listLoading(true))
//     return axios.get(`${URL_PATH}/${productCategoryId}`, {
//         timeout: 5000
//     }).then(response => dispatch(setProductCategory(response.data, true)))
//     .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
//     .finally(_ => dispatch(listLoading(false)))
// }

// export const setFilters = filters => async dispatch => {
//     dispatch(updateFilters(filters))
//     dispatch(fetchWithPaginationAndFilter(filters, 1))
// }

// export const closeModal = () => ({ type: CLOSE_MODAL })

// export const setCheckedItems = checkedItems => ({ type: SET_CHECKED_ITEMS, checkedItems })

// export default function(state = initialState, action) {
//     // console.log(action.type)
//     try {
//         switch (action.type) {
//             case LIST_LOADING: return {
//                 ...state,
//                 loading: action.loading
//             }
//             case RELOAD: return {
//                 ...state,
//                 reload: true
//             }
//             case MODAL_FORM_LOADING: return {
//                 ...state,
//                 formLoading: action.loading,
//                 errors: action.loading ? initialState.errors : state.errors
//             }
//             case MULTIPLE_EXECUTE_LOADING: return {
//                 ...state,
//                 multipleExecuteLoading: action.loading
//             }
//             case PREPARE_DATA: return {
//                 ...state,
//                 productCategoryList: action.productCategoryList,
//                 totalPages: action.totalPage,
//                 page: action.page,
//                 loading: false,
//                 reload: false
//             }
//             case UPDATE_FILTERS: return {
//                 ...state,
//                 filters: action.filters
//             }
//             case SET_CHECKED_ITEMS: return {
//                 ...state,
//                 checkedItems: action.checkedItems
//             }
//             case MODAL_FORM_GET_CREATE_ACTION: return {
//                 ...state,
//                 productCategory: initialState.productCategory,
//                 openModal: true,
//                 modalFormSuccessMessage: initialState.modalFormSuccessMessage
//             }
//             case MODAL_FORM_UPDATE_SUCCESS: return {
//                 ...state,
//                 modalFormSuccessMessage: action.message
//             }
//             case SET_PRODUCT_CATEGORY: return {
//                 ...state,
//                 productCategory: action.productCategory,
//                 openModal: action.openModal,
//                 modalFormSuccessMessage: initialState.modalFormSuccessMessage
//             }
//             case CLOSE_MODAL: return {
//                 ...state,
//                 openModal: false,
//                 listLoading: false,
//                 productCategory: initialState.productCategory,
//                 formLoading: initialState.formLoading,
//                 errors: initialState.errors,
//             }
//             case HANDLE_ERRORS: return {
//                 ...state,
//                 errors: {
//                     ...state.errors,
//                     ...action.errors.response.data
//                 }
//             }
//             default: return {
//                 ...state
//             }
//         }
//     } catch (error) {
//         console.log(error)
//     } finally {
        
//     }

//     return state;
// }
import axios from "../axios";
import { REDUX_API_URL } from "../../constants/redux-actions";
import { ACTIVE } from "../../constants/entites";
import {
  handleErrors,
  resetSystemErrors,
  openSystemPopup
} from "./rootReducer";

const prefix = "PRODUCT_CATEGORY_";
// API
const PATH_API = `http://localhost:5000/product/category`;
const createAction = action => `${prefix}${action}`;

export const initialState = {
  loading: true,
  createButtonLoading: false,
  formLoading: false,
  modalFormSuccessMessage: "",
  filters: {},
  openModal: false,
  productCategoryList: [],
  productCategory: {
    status: ACTIVE
  },
  modalStatus: {
    slugBasedOnName: true
  },
  errors: {
    formErrors: {},
    errorMessage: ""
  }
};

const LIST_LOADING = createAction("LIST_LOADING");
const OPEN_MODAL = createAction("OPEN_MODAL");
const CREATE_BUTTON_LOADING = createAction("CREATE_BUTTON_LOADING");
const RELOAD = createAction("RELOAD");
const PREPARE_DATA = createAction("PREPARE_DATA");
const UPDATE_FILTERS = createAction("UPDATE_FILTERS");
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const MODAL_FORM_GET_CREATE_ACTION = createAction(
  "MODAL_FORM_GET_CREATE_ACTION"
);
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS");
const SET_PRODUCT_CATEGORY = createAction("SET_PRODUCT_CATEGORY");
const SET_MODAL_STATUS = createAction("SET_MODAL_STATUS");
const CLOSE_MODAL = createAction("CLOSE_MODAL");
const SET_UPDATE_PRODUCT_CATEGORY_MODAL = createAction(
  "SET_UPDATE_PRODUCT_CATEGORY_MODAL"
);
const HANDLE_ERRORS = createAction("HANDLE_ERRORS");
const SET_ERRORS = createAction("SET_ERRORS");

const listLoading = loading => ({ type: LIST_LOADING, loading });
const createButtonLoading = loading => ({
  type: CREATE_BUTTON_LOADING,
  loading
});
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading });
const prepareData = data => ({
  type: PREPARE_DATA,
  productCategoryList: data
});
const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal });
const setErrors = errors => ({ type: SET_ERRORS, errors });
const modalFormSuccessMessage = message => ({
  type: MODAL_FORM_UPDATE_SUCCESS,
  message
});

export const setProductCategory = productCategory => ({
  type: SET_PRODUCT_CATEGORY,
  productCategory
});

export const setModalStatus = modalStatus => ({
  type: SET_MODAL_STATUS,
  modalStatus
});

export const closeModal = () => ({ type: CLOSE_MODAL });
export const fetchAll = () => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  return axios
    .get(PATH_API)
    .then(response => {
      dispatch(prepareData(response.data));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

export const doSave = productCategory => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(formLoading(true));
  const { productCategoryId, image, name, slugName, status } = productCategory;
  const params = { productCategoryId, image, name, slugName, status };
  if (!productCategoryId) {
    dispatch(doCreate(params));
  } else {
    dispatch(doUpdate({ ...params, productCategoryId }));
  }
};
export const getCreateAction = () => dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(createButtonLoading(true));
  dispatch({
    type: MODAL_FORM_GET_CREATE_ACTION
  });
  dispatch(createButtonLoading(false));
};

export const getUpdateAction = productCategoryId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(listLoading(true));
  axios
    .get(`${PATH_API}/${productCategoryId}`)
    .then(response => {
      dispatch({
        type: SET_UPDATE_PRODUCT_CATEGORY_MODAL,
        productCategory: response.data
      });
      dispatch(setOpenModal(true));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = productCategory => async dispatch => {
  const params = JSON.stringify(productCategory);
    axios.post(`${PATH_API}`, params, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
      dispatch(prepareData(response.data));
      dispatch(
        modalFormSuccessMessage("ProductCategory is created successfully!!")
      );
      dispatch(setProductCategory(initialState.productCategory));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

const doUpdate = productCategory => async dispatch => {
  const params = JSON.stringify(productCategory);
  console.log(productCategory
  )
  return axios
    .patch(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      dispatch(
        modalFormSuccessMessage("ProductCategory is update successfully!!")
      );
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = productCategoryId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  dispatch(setErrors(initialState.errors));
  return axios
    .delete(`${PATH_API}/${productCategoryId}`)
    .then(response => {
      dispatch(prepareData(response.data));
      dispatch(
        openSystemPopup(
          true,
          `Delete ProductCategory #${productCategoryId} success!!`
        )
      );
    })
    .catch(errors => dispatch(handleErrors(errors, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

export const setFilters = filters => ({ type: UPDATE_FILTERS, filters });

export default function(state = initialState, action) {
  // console.log(action.type)
  try {
    switch (action.type) {
      case LIST_LOADING:
        return { ...state, loading: action.loading };
      case CREATE_BUTTON_LOADING:
        return { ...state, createButtonLoading: action.loading };
      case RELOAD:
        return { ...state, reload: true };
      case MODAL_FORM_UPDATE_SUCCESS:
        return { ...state, modalFormSuccessMessage: action.message };
      case OPEN_MODAL:
        return { ...state, openModal: action.openModal };
      case MODAL_FORM_LOADING:
        return {
          ...state,
          formLoading: action.loading,
          errors: action.loading ? initialState.errors : state.errors
        };
      case PREPARE_DATA:
        return {
          ...state,
          productCategoryList: action.productCategoryList,
          loading: false
        };
      case UPDATE_FILTERS:
        return {
          ...state,
          filters: action.filters
        };
      case MODAL_FORM_GET_CREATE_ACTION:
        return {
          ...state,
          productCategory: initialState.productCategory,
          openModal: true,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_PRODUCT_CATEGORY:
        return {
          ...state,
          productCategory: action.productCategory,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_MODAL_STATUS:
        return {
          ...state,
          modalStatus: action.modalStatus,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_UPDATE_PRODUCT_CATEGORY_MODAL:
        return {
          ...state,
          productCategory: {
            ...action.productCategory
          },
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case CLOSE_MODAL:
        return {
          ...state,
          openModal: false,
          listLoading: false,
          productCategory: initialState.productCategory,
          formLoading: initialState.formLoading,
          errors: initialState.errors
        };
      case SET_ERRORS:
        return {
          ...state,
          errors: {
            ...initialState.errors,
            ...action.errors
          }
        };
      case HANDLE_ERRORS:
        return {
          ...state,
          errors: {
            ...state.errors,
            ...action.errors.response.data
          }
        };
      default:
        return { ...state };
    }
  } catch (error) {
    console.log(error);
  } finally {
  }

  return state;
}

