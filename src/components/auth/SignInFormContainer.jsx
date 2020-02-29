import React, {useContext} from 'react';
import SignInFormView from "./SignInFormView";
import {validatePassword, validateUsername} from "../../utils/AuthValidation";
import {useHistory, useLocation} from "react-router-dom";
import {AuthenticationContext} from "../../utils/AuthenticationContext";
import useFieldValidation from "../../utils/FieldValidation";
import Auth from "../../utils/Auth";

const SignInFormContainer = () => {
    const auth = new Auth();
    const history = useHistory();
    const location = useLocation();
    const {setUser} = useContext(AuthenticationContext);

    const {from} = location.state || {from: {pathname: "/"}};

    const usernameField = useFieldValidation('', validateUsername);
    const passwordField = useFieldValidation('', validatePassword);

    const [loginError, setLoginError] = React.useState('');


    let redirectAuthenticatedUser = () => {
        history.replace(from);
    };

    const redirectToRegister = () => {
        history.push('/register')
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginError('');
        const usernameErrors = usernameField.validate();
        const passwordErrors = passwordField.validate();

        if (!usernameErrors && !passwordErrors) {
            const authResult = await auth.signIn(usernameField.value, passwordField.value);
            if (authResult === undefined) {
                usernameField.clearValue();
                passwordField.clearValue();
                setLoginError('Invalid credentials');
                return;
            }
            console.log('set users');
            setUser(authResult);

            redirectAuthenticatedUser();

        }
    };

    return <SignInFormView usernameField={usernameField}
                           passwordField={passwordField}
                           loginErrorText={loginError}
                           redirectToRegister={redirectToRegister}
                           handleSubmit={handleSubmit}/>;
};

export default SignInFormContainer;