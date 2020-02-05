import React, { useState } from 'react'
import FormModule from '../../molecules/FormModule';
import ImageUpload from '../../atoms/ImageUpload'
import FormGroup from '../../atoms/FormGroup';
import Input from '../../atoms/Input';
import SelectSearch from '../../atoms/SelectSearch';

const Render = ({
    userProfile: { firstName, middleName, lastName, image },
    onChangeForm
}) => (
    <FormModule title="User Profile" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ display: 'flex' }}>
            <ImageUpload
                name="image" 
                width="180px"
                height="180px"
                circle
                source={image}
                onChange={onChangeForm} 
            />
            <div style={{ width: 'calc(100% - 180px - 32px)', paddingLeft: '32px', maxWidth: '600px' }}>
                <FormGroup row>
                    <Input 
                        width="32%"
                        required
                        margin="dense"
                        name="firstName"
                        label="First Name"
                    />
                    <Input
                        width="32%" 
                        required
                        margin="dense"
                        name="middleName"
                        label="Middle Name"
                    />
                    <Input 
                        width="32%" 
                        required
                        margin="dense"
                        name="lastName"
                        label="Last Name"
                    />
                </FormGroup>
                <FormGroup row>
                    <Input
                        width="49%" 
                        required
                        margin="dense"
                        name="phone"
                        label="Phone"
                    />
                    <Input 
                        width="49%"
                        required
                        margin="dense"
                        name="email"
                        label="Email"
                    />
                </FormGroup>
                <SelectSearch label="Province" />
                <Input
                    fullWidth
                    required
                    margin="dense"
                    multiline
                    rows={3}
                    label="Address" 
                    name="address"
                    // value={description}
                    // onChange={onChangeForm}
                    // error={formErrors.description}
                />
            </div>
        </div>
    </FormModule>
)

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState({})

    const renderProps = {
        userProfile,
        onChangeForm: (_, { name, value }) => setUserProfile({
            ...userProfile,
            [name]: value
        })
    }

    return <Render {...renderProps} />
}

export default UserProfile