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
import CenteredLoadingAnimation from "../misc/CenteredLoadingAnimation";
import FormHelperText from "@material-ui/core/FormHelperText";
import Alert from "../misc/Alert/Alert";

const AddGameComponentView = (props) => {

    const styles = useStyles();

    return (
        <form className={styles.root} onSubmit={props.handleSubmit}>
            {!props.isLoading ? <div>
                <ErrorAlert error={props.gameError}/>
                {props.success ? <Alert message={'Success'} severity='success'/> : ''}
                <Typography variant="h4" className={styles.heading}>
                    Add a game
                </Typography>
                <FormControl className={styles.select}>


                    <InputLabel id="select-opponent">Opponent</InputLabel>
                    <Select onChange={props.changeOpponent}
                            labelId="select-opponent"
                            value={props.opponent}
                    >
                        {props.players.map(player => (
                            <MenuItem
                                key={player.name}
                                value={player.id}
                            >
                                {player.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText><span style={{color: 'red'}}>{props.opponentHelperText}</span></FormHelperText>


                </FormControl>
                <FormControl className={styles.select}>

                    <InputLabel id="select-game-type">Game Type</InputLabel>
                    <Select onChange={props.changeGameType}
                            labelId="select-game-type"
                            value={props.gameType}

                    >
                        <MenuItem value='suddenDeath'>Sudden Death</MenuItem>
                        <MenuItem value='overtime'>Overtime</MenuItem>
                    </Select>
                    <FormHelperText><span style={{color: 'red'}}>{props.gameTypeHelperText}</span></FormHelperText>

                    <TextField id="player-score-field"
                               name="playerScore"
                               label="Your Score"
                               onChange={props.playerScoreField.handleChange}
                               onBlur={props.playerScoreField.handleBlur}
                               error={!!props.playerScoreField.errors}
                               helperText={props.playerScoreField.errors}
                               className={styles.formElement}
                    />
                    <TextField id="opponent-score-field"
                               name="opponentScore"
                               label="Opponent Score"
                               onChange={props.opponentScoreField.handleChange}
                               onBlur={props.opponentScoreField.handleBlur}
                               error={!!props.opponentScoreField.errors}
                               helperText={props.opponentScoreField.errors}
                               className={styles.formElement}
                    />
                    <TextField id="player-sinks"
                               name="playerSinks"
                               label="Your Sinks"
                               onChange={props.playerSinksField.handleChange}
                               onBlur={props.playerSinksField.handleBlur}
                               error={!!props.playerSinksField.errors}
                               helperText={props.playerSinksField.errors}
                               className={styles.formElement}
                    />
                    <TextField id="opponent-sinks"
                               name="opponentSinks"
                               label="Opponent Sinks"
                               onChange={props.opponentSinksField.handleChange}
                               onBlur={props.opponentSinksField.handleBlur}
                               error={!!props.opponentSinksField.errors}
                               helperText={props.opponentSinksField.errors}
                               className={styles.formElement}
                    />
                    <div className={styles.loginError}>{props.loginErrorText}</div>
                    <Button color="primary" variant="contained" className={styles.button}
                            type="submit">
                        Submit
                    </Button>

                </FormControl>
            </div> : <CenteredLoadingAnimation/>}

        </form>

    );
};

const useStyles = makeStyles(() => ({
    root: {},
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    select: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 20
    },
    formElement: {
        marginTop: 20,
    },
    button: {
        marginTop: 40
    },
    heading: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    loginError: {
        marginTop: 10,
        color: 'red',
        fontSize: 13
    }

}));

export default AddGameComponentView;