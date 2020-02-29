import React from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ErrorAlert from "../misc/ErrorAlert";
import SuccessAlert from "../misc/SuccessAlert";

const SignInFormView = (props) => {

    const styles = useStyles();

    return (
        <div className={styles.root}>

            <ErrorAlert error={props.submitError}/>

            {props.success === true ? <SuccessAlert success={{message: 'Registered successfully!'}}/> : ''}

            {!props.success ? <form className={styles.column} onSubmit={props.handleSubmit}>

                    <Typography variant="h4" className={styles.heading}>
                        Register
                    </Typography>


                    <TextField id="email-field"
                               name="username"
                               label="New Username"
                               value={props.usernameField.value}
                               onChange={props.usernameField.handleChange}
                               onBlur={props.usernameField.handleBlur}
                               error={!!props.usernameField.errors}
                               helperText={props.usernameField.errors}
                               className={styles.formElement}
                    />
                    <TextField id="password-field"
                               name="password"
                               label="New Password"
                               type="password"
                               value={props.passwordField.value}
                               onChange={props.passwordField.handleChange}
                               onBlur={props.passwordField.handleBlur}
                               error={!!props.passwordField.errors}
                               helperText={props.passwordField.errors}
                               className={styles.formElement}
                    />

                    <TextField id="password-field"
                               name="password"
                               label="Repeat Password"
                               type="password"
                               value={props.repeatPasswordField.value}
                               onChange={props.repeatPasswordField.handleChange}
                               onBlur={props.repeatPasswordField.handleBlur}
                               error={!!props.repeatPasswordField.errors}
                               helperText={props.repeatPasswordField.errors}
                               className={styles.formElement}
                    />
                    <div className={styles.loginError}>{props.loginErrorText}</div>
                    <Button color="primary" variant="contained" className={styles.button}
                            type="submit">
                        Sign in
                    </Button>

                </form> :
                <div className={styles.column}><Button color="primary" variant="contained" className={styles.button}
                                                       onClick={props.redirectToSignIn}>
                    Go to Sign In
                </Button></div>}
        </div>

    );
};

const useStyles = makeStyles(() => ({
    root: {},
    column: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    formElement: {
        marginTop: 20,
    },
    button: {
        marginTop: 40
    },
    heading: {
        textAlign: 'center'
    },
    loginError: {
        marginTop: 10,
        color: 'red',
        fontSize: 13
    }
}));

export default SignInFormView;