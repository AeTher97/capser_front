import React from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ErrorAlert from "../misc/ErrorAlert";

const AddGameComponentView = (props) => {

    const styles = useStyles();

    return (
        <div className={styles.root}>
            <ErrorAlert error={{message: 'Invalid somethign'}}/>
            <FormControl className={styles.column} onSubmit={props.handleSubmit}>

                <Typography variant="h4" className={styles.heading}>
                    Add a game
                </Typography>

                <InputLabel id="select-opponent">Opponent</InputLabel>
                <Select value={props.passedTheme}
                        onChange={props.changeTheme}
                        labelId="select-opponent"
                >
                    <MenuItem value='dark'>Dark</MenuItem>
                    <MenuItem value='light'>Light</MenuItem>
                </Select>


                <InputLabel id="select-game-type">Game Type</InputLabel>
                <Select onChange={props.changeTheme}
                        lableId="select-game-type"
                >
                    <MenuItem value='suddenDeath'>Sudden Death</MenuItem>
                    <MenuItem value=''>Overtime</MenuItem>
                </Select>

                <TextField id="player-score-field"
                           name="playerScore"
                           label="Your Score"
                           value={props.usernameField.value}
                           onChange={props.usernameField.handleChange}
                           onBlur={props.usernameField.handleBlur}
                           error={!!props.usernameField.errors}
                           helperText={props.usernameField.errors}
                           className={styles.formElement}
                />
                <TextField id="opponent-score-field"
                           name="opponentScore"
                           label="Opponent Score"
                           value={props.passwordField.value}
                           onChange={props.passwordField.handleChange}
                           onBlur={props.passwordField.handleBlur}
                           error={!!props.passwordField.errors}
                           helperText={props.passwordField.errors}
                           className={styles.formElement}
                />
                <TextField id="player-sinks"
                           name="playerSinks"
                           label="Your Sinks"
                           value={props.usernameField.value}
                           onChange={props.usernameField.handleChange}
                           onBlur={props.usernameField.handleBlur}
                           error={!!props.usernameField.errors}
                           helperText={props.usernameField.errors}
                           className={styles.formElement}
                />
                <TextField id="opponent-sinks"
                           name="opponentSinks"
                           label="Opponent Sinks"
                           value={props.usernameField.value}
                           onChange={props.usernameField.handleChange}
                           onBlur={props.usernameField.handleBlur}
                           error={!!props.usernameField.errors}
                           helperText={props.usernameField.errors}
                           className={styles.formElement}
                />
                <div className={styles.loginError}>{props.loginErrorText}</div>
                <Button color="primary" variant="contained" className={styles.button}
                        type="submit">
                    Submit
                </Button>

            </FormControl>


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
    },
    loginError: {
        marginTop: 10,
        color: 'red',
        fontSize: 13
    },

}));

export default AddGameComponentView;