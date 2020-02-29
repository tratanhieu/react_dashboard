import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Input from "../../../atoms/Input";
import {
  closeModal,
  doSave,
  setProvider,
} from "../../../../redux/reducers/providerReducer";
import _ from "lodash";
import ModalModule from "../../../molecules/ModalModule";
import ImageUpload from "../../../atoms/ImageUpload";
import ToggleActive from "../../../atoms/ToggleActive";
import FormGroup from "../../../atoms/FormGroup";

const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  provider: {
    providerId,
    name,
    address,
    phone,
    mail,
    origination,
    note,
    status
  },
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={!providerId ? "Create Provider" : "Update Provider"}
    open={openModal}
    loading={formLoading}
    modalSuccess={modalFormSuccessMessage}
    // minWidth="760px"
    onPositive={onPositive}
    onClose={onClose}
  >
    {/* <FormGroup row>
      <FormGroup style={{ width: "50%" }}>
        <FormGroup> */}
          <Input
            required
            label="Provider Name: "
            name="name"
            value={name}
            onChange={onChangeForm}
            disabled={!!providerId}
            error={formErrors.name}
          />
          <ToggleActive
            label="Status"
            checked={status}
            onChange={onChangeForm}
          />
        {/* </FormGroup>
      </FormGroup>
    </FormGroup> */}
  </ModalModule>
);

const ProviderModal = () => {
  const selector = useSelector(
    ({
      providerReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        provider,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      provider,
      errors
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    onChangeForm: (_, { name, value }) =>
      dispatch(setProvider({ ...selector.provider, [name]: value })),
    onPositive: () => dispatch(doSave(selector.provider)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default ProviderModal;
