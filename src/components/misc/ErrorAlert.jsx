import React from 'react';
import Alert from "./Alert/Alert";

const ErrorAlert = (props) => {
    const {error} = props;

    return (
        !!error && (<Alert message={error.message} severity="error"/>)
    );
};

export default ErrorAlert;