import React from 'react'
import FormModule from '../../molecules/FormModule';
import Input from '../../atoms/Input';

const Render = () => (
    <FormModule
        title="Change Password"
        maxWidth="320px"
        style={{ paddingLeft: '16px', paddingRight: '16px' }}
        showNegativeButton={false}
        positiveLabel="Update"
    >
        <Input 
            required
            margin="dense"
            name="oldPassword"
            label="Old Password"
        />
        <Input 
            required
            margin="dense"
            name="newPassword"
            label="New Password"
        />
        <Input 
            required
            margin="dense"
            name="confirmPassword"
            label="Confirm New Password"
        />
    </FormModule>
)

const ChangePassword = () => {
    const renderProps = {
        ab: ''
    }

    return <Render {...renderProps} />
}

export default ChangePassword