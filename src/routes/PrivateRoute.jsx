import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom"
import {AuthenticationContext} from "../utils/AuthenticationContext";

export default function PrivateRoute({children, ...rest}) {

    const {user} = useContext(AuthenticationContext);

    return (
        <Route
            {...rest}
            render={({location}) =>
                user != null ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}