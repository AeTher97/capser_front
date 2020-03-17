import React from 'react';
import Alert from "./Alert/Alert";

const SuccessAlert = (props) => {
    const {success} = props;

    return (
        !!success && (<Alert message={success.message} severity="success"/>)
    );
};

export default SuccessAlert;