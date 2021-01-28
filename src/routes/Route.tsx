import React from 'react';
import {
    RouterProps,
    Route as ReactDOMRoute,
    Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/authContext';

interface RouteProps extends RouterProps {
    isPrivate?: boolean;
    component: React.ComponentType;
    path: string;
    exact: boolean;
}

const Route: React.FC<RouteProps & any> = ({
    // eslint-disable-next-line
    isPrivate = false,
    // eslint-disable-next-line
    component: Component,
    ...rest
}) => {
    const { token } = useAuth();
    return (
        <ReactDOMRoute
            {...rest}
            render={({ location }) => {
                return isPrivate === !!token ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: isPrivate ? '/' : '/home',
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
};

export default Route;
