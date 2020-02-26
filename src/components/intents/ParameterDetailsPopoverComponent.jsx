import React from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Popover from "@material-ui/core/Popover";

const ParameterDetailsPopoverComponent = props => {
    const style = useStyle();

    const {parameter} = props;


    const getParameterList = () => {

        const items = props.parameters.toIndexedSeq().map((item, index) => (
            <ListItem button key={index} onClick={() => props.onParameterSelected(item)}>
                <ListItemText primary={item.displayName}/>
            </ListItem>));

        return (
            <List component="nav" aria-label="secondary mailbox folders">
                {items}
            </List>)
    };

    const getDeleteButton = () => {
        return props.onDelete ?
            (<IconButton aria-label="delete" onClick={() => props.onDelete(parameter)}>
                <DeleteIcon/>
            </IconButton>) : null;

    };

    const getHeader = () => {
        if (parameter) {
            return (
                <div className={style.row}>
                    <Typography className={style.entityName}>
                        {parameter.displayName}
                    </Typography>

                    {getDeleteButton()}
                </div>)
        } else {
            return null;
        }
    };

    return (
        <Card elevation={3} className={style.card}>
            <Popover
                // id={id}
                open={props.open}
                anchorEl={props.anchorEl}
                onClose={props.onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {getHeader()}
                <Divider/>
                <div>
                    {getParameterList()}
                </div>
            </Popover>
        </Card>
    );
};

const useStyle = makeStyles(theme => ({
    card: {
        minWidth: 275,
    },
    entityName: {
        fontSize: 16,
        marginLeft: 20
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}));

export default ParameterDetailsPopoverComponent;