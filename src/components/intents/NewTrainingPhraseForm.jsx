import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from "@material-ui/core/IconButton";

const NewTrainingPhraseForm = (props) => {
    const styles = useStyles();

    const [value, setValue] = useState('');

    const addNewTrainingPhrase = (event) => {
        event.preventDefault();
        props.onSubmit(value);
        setValue('');
    };

    return (
        <form className={styles.root} onSubmit={addNewTrainingPhrase}>
            <TextField value={value}
                       onChange={(event => setValue(event.target.value))}
                       label="New training phrase"
                       margin="dense"
                       fullWidth
                // variant="outlined"
            />

            <IconButton
                onClick={addNewTrainingPhrase}
                aria-label="delete"
                disabled={value.length === 0} className={styles.iconMargin}>
                <AddCircleOutlineIcon/>
            </IconButton>
        </form>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',

    },
    iconMargin: {
        margin: theme.spacing(1),
    },
}));

export default NewTrainingPhraseForm;