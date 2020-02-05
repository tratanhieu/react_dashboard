import React from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Input from "../../../atoms/Input";
import { closeModal, doSave, setPromotion } from '../../../../redux/reducers/promotionReducer';
import ModalModule from "../../../molecules/ModalModule";
import ToggleActive from "../../../atoms/ToggleActive";
import SelectSearch from "../../../atoms/SelectSearch";
import FormGroup from "../../../atoms/FormGroup";

const Render = ({
    openModal,
    formLoading,
    modalFormSuccessMessage,
    promotion: { promotionId, firstName, middleName, lastName, email, phone, promotionGroup, status },
    promotionGroupList,
    errors: { formErrors },
    onChangeForm,
    onPositive,
    onClose
}) => (
    <ModalModule
        title="Create Promotion"
        open={openModal}
        loading={formLoading}
        modalSuccess={modalFormSuccessMessage}
        minWidth="sm"
        onPositive={onPositive}
        onClose={onClose}
    >
        <FormGroup row>
            <Input
                width="32%"
                required
                label="First Name: "
                name="firstName"
                value={firstName}
                onChange={onChangeForm}
                disabled={!!promotionId}
                error={formErrors.firstName}
            />
            <Input
                width="32%"
                required
                label="Middle Name: "
                name="middleName"
                value={middleName}
                onChange={onChangeForm}
                disabled={!!promotionId}
                error={formErrors.middleName}
            />
            <Input
                width="32%"
                required
                label="Last Name: "
                name="lastName"
                value={lastName}
                onChange={onChangeForm}
                disabled={!!promotionId}
                error={formErrors.lastName}
            />
        </FormGroup>
        <FormGroup row>
            <Input
                width="49%"
                required
                label="Phone: "
                name="phone"
                value={phone}
                onChange={onChangeForm}
                disabled={!!promotionId}
                error={formErrors.phone}
            />
            <Input
                width="49%"
                required
                label="Email: "
                name="email"
                value={email}
                onChange={onChangeForm}
                disabled={!!promotionId}
                error={formErrors.email}
            />
        </FormGroup>
        <SelectSearch
            required
            label="Promotion Group"
            options={promotionGroupList}
            value={promotionGroup}
            getOptionLabel={option => option.name}
            onChange={(_, value) => onChangeForm(_, { name: 'promotionGroup', value })}
            error={formErrors.promotionGroup}
        />
        <ToggleActive
            label="Active"
            checked={status}
            onChange={onChangeForm}
        />
    </ModalModule>
);

const PromotionModal = () => {
    const selector = useSelector(({
        promotionReducer: { 
            openModal,
            modalFormSuccessMessage,
            formLoading,
            promotion,
            promotionGroupList,
            errors
        }
    }) => ({ 
        openModal,
        modalFormSuccessMessage,
        formLoading,
        promotion,
        promotionGroupList,
        errors
    }), shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onChangeForm: (_, { name, value }) => dispatch(setPromotion({ ...selector.promotion, [name]: value })),
        onPositive: () => dispatch(doSave(selector.promotion)),
        onClose: () => dispatch(closeModal())
    };

    return <Render {...renderProps} />;
};

export default PromotionModal;
