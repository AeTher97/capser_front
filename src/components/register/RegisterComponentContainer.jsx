import React, {useState} from 'react';
import {validatePassword, validateUsername} from "../../utils/AuthValidation";
import {useHistory, useLocation} from "react-router-dom";
import useFieldValidation from "../../utils/FieldValidation";
import RegisterFormView from "./RegisterFormView"
import axios from "axios";

const RegisterComponentContainer = () => {
    const history = useHistory();
    const location = useLocation();

    const [submitError, setSubmitError] = useState(null);
    const [success, setSuccess] = useState(false);

    const {from} = location.state || {from: {pathname: "/"}};

    const usernameField = useFieldValidation('', validateUsername);
    const passwordField = useFieldValidation('', validatePassword);
    const repeatPasswordField = useFieldValidation('', validatePassword);

    const [loginError, setLoginError] = React.useState('');


    let redirectToSignIn = () => {
        history.push('/login');
    };

    const handleSubmit = async (event) => {
        setSubmitError(null);
        event.preventDefault();
        setLoginError('');
        const usernameErrors = usernameField.validate();
        const passwordErrors = passwordField.validate();
        const repeatPasswordErrors = repeatPasswordField.validate();

        if (passwordField.value !== repeatPasswordField.value) {
            setSubmitError({message: 'Passwords don\'t match!'});
            return;
        }

        if (!usernameErrors && !passwordErrors && !repeatPasswordErrors) {

            const data = {
                username: usernameField.value,
                password: passwordField.value,
                repeatPassword: repeatPasswordField.value
            };

            const url = `${process.env.REACT_APP_CAPSER_BACKEND}/action/register`;
            axios.post(url, data, {withCredentials: true})
                .then((res) => {
                    setSuccess(true);
                })
                .catch(err => {
                    console.log(err.message);
                    setSubmitError({message: 'Error while registering!'})
                });


        }
    };

    return <RegisterFormView usernameField={usernameField}
                             passwordField={passwordField}
                             repeatPasswordField={repeatPasswordField}
                             loginErrorText={loginError}
                             submitError={submitError}
                             success={success}
                             redirectToSignIn={redirectToSignIn}
                             handleSubmit={handleSubmit}/>;
};

export default RegisterComponentContainer;