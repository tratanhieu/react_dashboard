import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';
import cookie from 'js-cookie'
import { ROUTE_LOGIN } from '.';
import { USER_TOKEN } from '../constants';

export const isAuthenticated = () => !!cookie.get(USER_TOKEN)

const AuthRoute = ({ children, ...rest }) => {
    return (
        <Route
            render={({ location }) =>
                isAuthenticated() ? children : (
                    <Redirect
                        to={{
                        pathname: ROUTE_LOGIN,
                        state: { from: location }
                        }}
                    />
                )
            }
            {...rest}
        />
    )
}
export default AuthRoute