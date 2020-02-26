import React from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const SignInFormView = (props) => {

    const styles = useStyles();

    return (
        <div className={styles.root}>

            <form className={styles.column} onSubmit={props.handleSubmit}>

                <Typography variant="h4" className={styles.heading}>
                    Sign In
                </Typography>


                <TextField id="email-field"
                           name="email"
                           label="Email"
                           value={props.emailField.value}
                           onChange={props.emailField.handleChange}
                           onBlur={props.emailField.handleBlur}
                           error={!!props.emailField.errors}
                           helperText={props.emailField.errors}
                           className={styles.formElement}
                />
                <TextField id="password-field"
                           name="password"
                           label="Password"
                           type="password"
                           value={props.passwordField.value}
                           onChange={props.passwordField.handleChange}
                           onBlur={props.passwordField.handleBlur}
                           error={!!props.passwordField.errors}
                           helperText={props.passwordField.errors}
                           className={styles.formElement}
                />

                <Button color="primary" variant="contained" className={styles.button} type="submit">
                    Sign in
                </Button>

            </form>
        </div>

    );
};

const useStyles = makeStyles(() => ({
    root: {},
    column: {
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
    }
}));

export default SignInFormView;