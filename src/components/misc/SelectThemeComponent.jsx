import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";

const SelectThemeComponent = (props) => {
    const styles = useStyles();


    return (
        <div className={styles.root}>
            <FormControl>
                <Select value={props.passedTheme}
                        onChange={props.changeTheme}
                >
                    <MenuItem value='dark'>Dark</MenuItem>
                    <MenuItem value='light'>Light</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        justifyContent: 'right',

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    background: {
        color: 'white'

    }
}));

export default SelectThemeComponent;
