import axios from "axios";
import { REDUX_API_URL } from "../../constants/redux-actions";
import { ACTIVE } from "../../constants/entites";
import {
  handleErrors,
  resetSystemErrors,
  openSystemPopup
} from "./rootReducer";

const prefix = "PRODUCT_TYPE_GROUP_";
// API
const PATH_API = `product/type_group`;
const createAction = action => `${prefix}${action}`;

export const initialState = {
  loading: true,
  createButtonLoading: false,
  formLoading: false,
  modalFormSuccessMessage: "",
  filters: {},
  openModal: true,
  productTypeGroupList: [],
  productTypeGroup: {
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
const SET_PRODUCT_TYPE_GROUP = createAction("SET_PRODUCT_TYPE_GROUP");
const SET_MODAL_STATUS = createAction("SET_MODAL_STATUS");
const CLOSE_MODAL = createAction("CLOSE_MODAL");
const SET_UPDATE_PRODUCT_TYPE_GROUP_MODAL = createAction(
  "SET_UPDATE_PRODUCT_TYPE_GROUP_MODAL"
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
  productTypeGroupList: data
});
const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal });
const setErrors = errors => ({ type: SET_ERRORS, errors });
const modalFormSuccessMessage = message => ({
  type: MODAL_FORM_UPDATE_SUCCESS,
  message
});

export const setProductTypeGroup = productTypeGroup => ({
  type: SET_PRODUCT_TYPE_GROUP,
  productTypeGroup
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
    .then(response => dispatch(prepareData(response.data)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

export const doSave = productTypeGroup => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(formLoading(true));
  const {
    productTypeGroupId,
    firstName,
    middleName,
    lastName,
    email,
    phone,
    productTypeGroupGroup,
    status
  } = productTypeGroup;
  const productTypeGroupGroupId = productTypeGroupGroup.productTypeGroupGroupId;
  const params = {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    productTypeGroupGroupId,
    status
  };
  if (!productTypeGroupId) {
    dispatch(doCreate(params));
  } else {
    dispatch(doUpdate({ ...params, productTypeGroupId }));
  }
};
export const getCreateAction = () => dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(createButtonLoading(true));
  return axios
    .get(`${PATH_API}/create`)
    .then(({ data: { productTypeGroupGroupList = [], provinceList = [] } }) => {
      dispatch({
        type: MODAL_FORM_GET_CREATE_ACTION,
        productTypeGroupGroupList,
        provinceList
      });
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(createButtonLoading(false)));
};

export const getUpdateAction = productTypeGroupId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(listLoading(true));
  axios
    .get(`${PATH_API}/update/${productTypeGroupId}`)
    .then(response => {
      dispatch({
        type: SET_UPDATE_PRODUCT_TYPE_GROUP_MODAL,
        productTypeGroup: response.data.productTypeGroup,
        productTypeGroupGroupList: response.data.productTypeGroupGroupList
      });
      dispatch(setOpenModal(true));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = productTypeGroup => async dispatch => {
  const params = JSON.stringify(productTypeGroup);
  axios
    .post(PATH_API, params, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      dispatch(
        modalFormSuccessMessage("ProductTypeGroup is created successfully!!")
      );
      dispatch(setProductTypeGroup(initialState.productTypeGroup));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

const doUpdate = productTypeGroup => async dispatch => {
  const params = JSON.stringify(productTypeGroup);
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
        modalFormSuccessMessage("ProductTypeGroup is update successfully!!")
      );
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = productTypeGroupId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  dispatch(setErrors(initialState.errors));
  return axios
    .delete(`${PATH_API}/${productTypeGroupId}`)
    .then(response => {
      dispatch(prepareData(response.data));
      dispatch(
        openSystemPopup(
          true,
          `Delete ProductTypeGroup #${productTypeGroupId} success!!`
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
          productTypeGroupList: action.productTypeGroupList,
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
          productTypeGroup: initialState.productTypeGroup,
          productTypeGroupGroupList: action.productTypeGroupGroupList,
          openModal: true,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_PRODUCT_TYPE_GROUP:
        return {
          ...state,
          productTypeGroup: action.productTypeGroup,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_MODAL_STATUS:
        return {
          ...state,
          modalStatus: action.modalStatus,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_UPDATE_PRODUCT_TYPE_GROUP_MODAL:
        return {
          ...state,
          productTypeGroup: {
            ...action.productTypeGroup,
            productTypeGroupGroup: action.productTypeGroupGroupList.find(
              item =>
                item.productTypeGroupGroupId ===
                action.productTypeGroup.productTypeGroupGroupId
            )
          },
          productTypeGroupGroupList: action.productTypeGroupGroupList,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case CLOSE_MODAL:
        return {
          ...state,
          openModal: false,
          listLoading: false,
          productTypeGroup: initialState.productTypeGroup,
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
