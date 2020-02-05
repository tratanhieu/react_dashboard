import React, { useState } from 'react'
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { Telegram, Close } from '@material-ui/icons';

const Render = ({ forgotPassword, ...rest }) => (
    <div className="login-screen">
        {!forgotPassword ? <LoginForm {...rest} /> : <ResetPasswordForm {...rest} />}
    </div>
)

const ResetPasswordForm = ({ onSendResetPassword, onCancelResetPassword }) => (
    <div className="login-form">
        <h2>Reset Password</h2>
        <Input
            variant="standard"
            size="medium"
            className="form-group"
            name="phone" 
            required
            label="Your Phone Number"
        />
        <Button
            style={{ marginRight: '8px' }}
            size="large"
            onClick={onSendResetPassword}
            endIcon={<Telegram /> }
            content="SEND"
        />
        <Button
            style={{ marginLeft: '8px' }}
            color="default"
            size="large"
            onClick={onCancelResetPassword}
            endIcon={<Close /> }
            content="CANCEL"
        />
    </div>
)

const ResetPasswordConfirmForm = ({ onConfirmVerifyCode, onCancelResetPassword }) => (
    <div className="login-form">
        <h2>Confirm Reset Password</h2>
        <Input
            variant="standard"
            size="medium"
            className="form-group"
            name="verifyCode" 
            required
            label="Your 6 digi character"
        />
        <Button
            style={{ marginRight: '8px' }}
            size="large"
            onClick={onConfirmVerifyCode}
            endIcon={<Telegram /> }
            content="SEND"
        />
        <Button
            style={{ marginLeft: '8px' }}
            color="default"
            size="large"
            onClick={onCancelResetPassword}
            endIcon={<Close /> }
            content="CANCEL"
        />
    </div>
)

const PasswordChangeForm = ({ onChangePassword }) => (
    <div className="login-form">
        <h2>Welcome</h2>
        <Input
            variant="standard"
            size="medium"
            className="form-group"
            name="password" 
            required
            label="Password"
        />
        <Input
            variant="standard"
            size="medium"
            className="form-group"
            type="password"
            name="confirmPassword"
            required
            label="Confirm Password"
        />
        <Button
            size="large"
            endIcon={<Telegram /> }
            onClick={onChangePassword}
            content="CONFIRM"
        />
    </div>
)

const LoginForm = ({ onClickForgotPassword, onLogin }) => (
    <div className="login-form">
        <h2>Welcome</h2>
        <Input
            variant="standard"
            size="medium"
            className="form-group"
            name="username" 
            required
            label="User Name"
        />
        <Input
            variant="standard"
            size="medium"
            className="form-group"
            type="password"
            name="password"
            required
            label="Password"
        />
        <span
            className="forgot-password" 
            onClick={onClickForgotPassword}
        >Forgot password?</span>
        <Button
            size="large"
            endIcon={<Telegram /> }
            onClick={onLogin}
            content="LOGIN"
        />
    </div>
)



export function Login({}) {
    const [forgotPassword, setForgotPassword] = useState(false)
    const renderProps = {
        forgotPassword,
        onClickForgotPassword: () => setForgotPassword(true),
        onCancelResetPassword: () => setForgotPassword(false)
    }

    return <Render {...renderProps} />
}