import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CenteredLoadingAnimation from "../misc/CenteredLoadingAnimation";
import Pagination from "@material-ui/lab/Pagination";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import WarningIcon from '@material-ui/icons/Warning';
import Tooltip from "@material-ui/core/Tooltip";
import {ListItemSecondaryAction} from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";

export default function (props) {


    const classes = useStyles();


    const displayPlayer = (player, index) => {

        let place = index;
        place = place + 1 + (props.page - 1) * 10;

        return (

            <ListItem key={index} alignItems="flex-start">
                <ListItemIcon primary={place}>
                    <Typography variant={"h5"}>{place}</Typography>
                </ListItemIcon>
                <ListItemAvatar>
                    <Tooltip title={<div>
                        <Typography variant={"subtitle2"}>Games Won {player.gamesWon}</Typography>
                        <Typography variant={"subtitle2"}>Games Lost {player.gamesLost}</Typography>
                        <Typography variant={"subtitle2"}>Average
                            Rebuttals {Math.round(player.averageRebottles).toFixed(2)}</Typography>
                        <Typography variant={"subtitle2"}>Win/Loss
                            Ratio {Math.round(player.winLossRatio).toFixed(2)}</Typography>
                        <Typography variant={"subtitle2"}>Sinks Made To Lost
                            Ratio {Math.round(player.sinksMadeToLostRatio).toFixed(2)}</Typography>
                        <Typography variant={"subtitle2"}>Naked
                            Laps {Math.round(player.sinksMadeToLostRatio).toFixed(2)}</Typography>
                    </div>
                    } arrow>
                        <Avatar alt="Remy Sharp" src="/avatar.jfif"/>
                    </Tooltip>
                </ListItemAvatar>
                <ListItemText
                    primary={<Typography variant={"h6"} className={classes.link}>{player.name}</Typography>}
                    secondary={
                        <React.Fragment>
                            Points {Math.floor(player.points)}
                        </React.Fragment>
                    }
                />
                <ListItemSecondaryAction>
                    {player.nakedLap ? <Tooltip title="Naked lap warning" TransitionComponent={Zoom}>
                        <WarningIcon style={{color: 'red'}}/>

                    </Tooltip> : ''}
                </ListItemSecondaryAction>

            </ListItem>
        )
    };


    const listPlayers = !!props.players && props.players.toIndexedSeq()
        .map(displayPlayer);


    return (<div>
            <ListItem>
                {!props.isLoading ? <Typography variant={"h5"}>Players</Typography> : ''}
            </ListItem>
            <List className={classes.root}>
                {props.isLoading ? <CenteredLoadingAnimation/> : listPlayers}
            </List>


            <Pagination showFirstButton showLastButton className={classes.pagination} count={props.pageNumber}
                        page={props.page}
                        onChange={props.handleChange}
                        color="primary" variant="outlined"
                        shape="rounded"/>
        </div>
    )


}


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderWidth: 0.5,
        boxShadow: "1px 1px  #9E9E9E"

    },
    mixColor: {
        backgroundColor: theme.palette.background.paper,
    },
    headingColumn: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    subtitleText: {
        color: theme.palette.text.secondary,
    },
    column: {
        flexBasis: '32%',
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
        },
    },
    pagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20

    },

}));

