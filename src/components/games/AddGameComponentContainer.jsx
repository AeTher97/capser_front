import React from 'react';
import {validatePassword, validateUsername} from "../../utils/AuthValidation";
import {useLocation} from "react-router-dom";
import useFieldValidation from "../../utils/FieldValidation";
import AddGameComponentView from "./AddGameComponentView";

const AddGameComponentContainer = () => {
    const location = useLocation();


    const usernameField = useFieldValidation('', validateUsername);
    const passwordField = useFieldValidation('', validatePassword);

    const [loginError, setLoginError] = React.useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginError('');
        const usernameErrors = usernameField.validate();
        const passwordErrors = passwordField.validate();

        if (!usernameErrors && !passwordErrors) {


        }
    };

    return <AddGameComponentView usernameField={usernameField}
                                 passwordField={passwordField}
                                 loginErrorText={loginError}
                                 handleSubmit={handleSubmit}/>;
};

export default AddGameComponentContainer;