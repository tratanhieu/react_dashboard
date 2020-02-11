<<<<<<< HEAD
import React from 'react'
import FormModule from '../../molecules/FormModule';
import Input from '../../atoms/Input';

const Render = () => (
    <FormModule title="Change Password" maxWidth="320px" de style={{ paddingLeft: '16px', paddingRight: '16px' }}>
=======
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import FormModule from '../../molecules/FormModule';
import Input from '../../atoms/Input';
import { setChangePasswordForm, doChangePassword, resetSettingForm } from '../../../redux/reducers/settingReducer';
import { ROUTE_LOGIN } from '../../../routes'

const Render = ({
    formLoading,
    formSuccessMessage,
    changePasswordForm: { oldPassword, newPassword, confirmPassword },
    errors: { formErrors },
    onChangeForm,
    onPositive
}) => (
    <FormModule
        title="Change Password"
        maxWidth="320px"
        style={{ paddingLeft: '16px', paddingRight: '16px' }}
        showNegativeButton={false}
        loading={formLoading}
        formSuccess={formSuccessMessage}
        positiveLabel="Update"
        onPositive={onPositive}
    >
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
        <Input 
            required
            margin="dense"
            name="oldPassword"
            label="Old Password"
<<<<<<< HEAD
=======
            value={oldPassword}
            onChange={onChangeForm}
            error={formErrors.oldPassword}
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
        />
        <Input 
            required
            margin="dense"
            name="newPassword"
            label="New Password"
<<<<<<< HEAD
=======
            value={newPassword}
            onChange={onChangeForm}
            error={formErrors.newPassword}
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
        />
        <Input 
            required
            margin="dense"
            name="confirmPassword"
            label="Confirm New Password"
<<<<<<< HEAD
=======
            value={confirmPassword}
            onChange={onChangeForm}
            error={formErrors.confirmPassword}
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
        />
    </FormModule>
)

const ChangePassword = () => {
<<<<<<< HEAD
    const renderProps = {
        ab: ''
=======
    
    const selector = useSelector(({
        settingReducer: {
            changePasswordForm,
            formLoading,
            formSuccessMessage,
            errors
        } 
    }) => ({
        changePasswordForm,
        formLoading,
        formSuccessMessage,
        errors
    }), shallowEqual)

    const dispatch = useDispatch()

    const history = useHistory()

    useEffect(() => {
        dispatch(resetSettingForm())
    }, [])

    const renderProps = {
        ...selector,
        onChangeForm: (_, { name, value }) => {
            dispatch(setChangePasswordForm({
                ...selector.changePasswordForm,
                [name]: value
            }))
        },
        onPositive: () => dispatch(
            doChangePassword(
                selector.changePasswordForm,
                () => history.push(ROUTE_LOGIN)
            )
        )
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
    }

    return <Render {...renderProps} />
}

export default ChangePassword