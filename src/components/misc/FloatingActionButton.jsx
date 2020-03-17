import {Tooltip} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import {useHistory} from "react-router-dom";


export default () => {

    const history = useHistory();
    const fab = {
        zIndex: 999,
        margin: 0,
        top: 'auto',
        right: 50,
        bottom: 50,
        left: 'auto',
        position: 'fixed',
    };

    const handleFabClick = () => {
        history.push("/add");
    };

    return (<Tooltip title="Post game" aria-label="add" style={fab}>
        <Fab color="primary" onClick={handleFabClick}>
            <AddIcon/>
        </Fab>
    </Tooltip>)
}