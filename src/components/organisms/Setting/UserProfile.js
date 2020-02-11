<<<<<<< HEAD
import React, { useState } from 'react'
=======
import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
import FormModule from '../../molecules/FormModule';
import ImageUpload from '../../atoms/ImageUpload'
import FormGroup from '../../atoms/FormGroup';
import Input from '../../atoms/Input';
import SelectSearch from '../../atoms/SelectSearch';
<<<<<<< HEAD

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
=======
import {
    setUserProfileForm,
    getUserProfile,
    getDistrictList,
    getWardList,
    doUpdateProfile
} from '../../../redux/reducers/settingReducer';

const Render = ({
    formLoading,
    userProfileForm: {
        firstName,
        middleName,
        lastName,
        email,
        phone,
        avatar,
        province = {},
        district = {},
        ward = {},
        address
    },
    provinceList = [],
    districtList = [],
    wardList = [],
    formSuccessMessage,
    errors: { formErrors },
    onChangeForm,
    onPositive
}) => (
    <FormModule
        title="User Profile"
        maxWidth="768px"
        style={{ paddingLeft: '16px', paddingRight: '16px' }}
        loading={formLoading}
        showNegativeButton={false}
        positiveLabel="Update"
        formSuccess={formSuccessMessage}
        onPositive={onPositive}
    >
        <div style={{ display: 'flex' }}>
            <ImageUpload
                name="avatar" 
                width="180px"
                height="180px"
                circle
                source={avatar}
                onChange={onChangeForm} 
            />
            <div style={{ width: 'calc(100% - 180px - 32px)', paddingLeft: '32px' }}>
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
                <FormGroup row>
                    <Input 
                        width="32%"
                        required
                        margin="dense"
                        name="firstName"
                        label="First Name"
<<<<<<< HEAD
=======
                        value={firstName}
                        onChange={onChangeForm}
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
                    />
                    <Input
                        width="32%" 
                        required
                        margin="dense"
                        name="middleName"
                        label="Middle Name"
<<<<<<< HEAD
=======
                        value={middleName}
                        onChange={onChangeForm}
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
                    />
                    <Input 
                        width="32%" 
                        required
                        margin="dense"
                        name="lastName"
                        label="Last Name"
<<<<<<< HEAD
=======
                        value={lastName}
                        onChange={onChangeForm}
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
                    />
                </FormGroup>
                <FormGroup row>
                    <Input
                        width="49%" 
                        required
                        margin="dense"
                        name="phone"
<<<<<<< HEAD
                        label="Phone"
=======
                        disabled={true}
                        label="Phone"
                        value={phone}
                        onChange={onChangeForm}
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
                    />
                    <Input 
                        width="49%"
                        required
                        margin="dense"
                        name="email"
                        label="Email"
<<<<<<< HEAD
                    />
                </FormGroup>
                <SelectSearch label="Province" />
=======
                        value={email}
                        onChange={onChangeForm}
                    />
                </FormGroup>
                <SelectSearch
                    label="Province"
                    options={provinceList}
                    value={province}
                    getOptionLabel={option => option.name}
                    onChange={(_, value) => onChangeForm(_, { name: 'province', value })}
                    error={formErrors.provinceId}
                />
                <SelectSearch
                    label="District"
                    options={districtList}
                    value={district}
                    getOptionLabel={option => option.name}
                    onChange={(_, value) => onChangeForm(_, { name: 'district', value })}
                    error={formErrors.district}
                />
                <SelectSearch
                    label="Ward"
                    options={wardList}
                    value={ward}
                    getOptionLabel={option => option.name}
                    onChange={(_, value) => onChangeForm(_, { name: 'ward', value })}
                    error={formErrors.ward}
                />
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
                <Input
                    fullWidth
                    required
                    margin="dense"
<<<<<<< HEAD
                    multiline
                    rows={3}
                    label="Address" 
                    name="address"
                    // value={description}
                    // onChange={onChangeForm}
                    // error={formErrors.description}
=======
                    label="Address" 
                    name="address"
                    value={address}
                    onChange={onChangeForm}
                    error={formErrors.address}
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
                />
            </div>
        </div>
    </FormModule>
)

const UserProfile = () => {
<<<<<<< HEAD
    const [userProfile, setUserProfile] = useState({})

    const renderProps = {
        userProfile,
        onChangeForm: (_, { name, value }) => setUserProfile({
            ...userProfile,
            [name]: value
        })
=======
    const selector = useSelector(({
        settingReducer: {
            userProfileForm,
            provinceList,
            districtList,
            wardList,
            formLoading,
            formSuccessMessage,
            errors
        } 
    }) => ({
        userProfileForm,
        provinceList,
        districtList,
        wardList,
        formLoading,
        formSuccessMessage,
        errors
    }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserProfile())
    }, [])

    const renderProps = {
        ...selector,
        onChangeForm: (_, { name, value }) => {
            dispatch(setUserProfileForm({
                ...selector.userProfileForm,
                [name]: value
            }))
            if (name === 'province' && value) {
                dispatch(getDistrictList(value.provinceId))
            }
            if (name === 'district' && value) {
                dispatch(getWardList(value.provinceId, value.districtId))
            }
        },
        onPositive: () => dispatch(doUpdateProfile(selector.userProfileForm))
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62
    }

    return <Render {...renderProps} />
}

export default UserProfile