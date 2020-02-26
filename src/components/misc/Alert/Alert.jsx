import React from 'react';
import Paper from "@material-ui/core/Paper";
import classNames from 'classnames'
import {makeStyles} from "@material-ui/core";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import Typography from "@material-ui/core/Typography";

const Alert = (props) => {

    const styles = useStyles();


    const getIcon = (level) => {
        switch (level) {
            case 'error':
                return <ErrorOutlineIcon className={styles.icon}/>;
            case 'warning':
                return <PriorityHighIcon className={styles.icon}/>;
            case 'info':
                return <InfoOutlinedIcon className={styles.icon}/>;
            case 'success':
                return <CheckCircleOutlineOutlinedIcon className={styles.icon}/>;
            default:
                return null
        }
    };

    return (
        <Paper elevation={6} className={classNames(styles.root, styles[props.severity])}>
            {getIcon(props.severity)}
            <Typography test-id="alert-text" className={styles.text}>
                {props.message}
            </Typography>
        </Paper>
    );
};


const useStyles = makeStyles(() => ({

    root: {
        display: 'flex',
        alignItems: 'center',
        padding: 20

    },

    icon: {
        color: '#fff'
    },

    text: {
        marginLeft: 20,
        color: '#fff'
    },

    error: {
        backgroundColor: '#f44336'
    },
    warning: {
        backgroundColor: '#ff9800'
    },
    info: {
        backgroundColor: '#2196f3'
    },
    success: {
        backgroundColor: '#4caf50'
    },
}))

export default Alert;