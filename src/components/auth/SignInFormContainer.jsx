import React, {useContext} from 'react';
import SignInFormView from "./SignInFormView";
import {validateEmail, validatePassword} from "../../utils/AuthValidation";
import {useHistory, useLocation} from "react-router-dom";
import {AuthenticationContext} from "../../utils/AuthenticationContext";
import useFieldValidation from "../../utils/FieldValidation";

const SignInFormContainer = () => {
    const history = useHistory();
    const location = useLocation();
    const {setUser} = useContext(AuthenticationContext);

    const {from} = location.state || {from: {pathname: "/"}};

    const emailField = useFieldValidation('', validateEmail);
    const passwordField = useFieldValidation('', validatePassword);

    let redirectAuthenticatedUser = () => {
        history.replace(from);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const emailErrors = emailField.validate();
        const passwordErrors = passwordField.validate();

        if (!emailErrors && !passwordErrors) {
            //    TODO: Authenticate user
            let fakeUser = {
                email: 'examile@gmail.com',
                accessToken: 'fake.access.token'
            };
            setUser(fakeUser);
            redirectAuthenticatedUser()
        }
    };

    return <SignInFormView emailField={emailField}
                           passwordField={passwordField}
                           handleSubmit={handleSubmit}/>;
};

export default SignInFormContainer;