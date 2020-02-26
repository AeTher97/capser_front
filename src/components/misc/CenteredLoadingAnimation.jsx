import React from 'react';
import {makeStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const CenteredLoadingAnimation = () => {
    const classes = useStyles();

    return (
        <div className={classes.centeredRow}>
            <CircularProgress test-id="loading-circle"/>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    centeredRow: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

export default CenteredLoadingAnimation;