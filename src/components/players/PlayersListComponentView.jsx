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
import WarningIcon from '@material-ui/icons/Warning';
import Tooltip from "@material-ui/core/Tooltip";
import {ListItemSecondaryAction, useTheme} from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import Divider from "@material-ui/core/Divider";
import VersionBuild from "../misc/VersionBuild";

export default function (props) {


    const theme = useTheme();
    const classes = useStyles();

    const displayPlayer = (player, index) => {

        let place = index;
        place = place + 1 + (props.page - 1) * 10;

        const lastGame = new Date(player.lastGame);
        let daysSinceLastGame = null;
        if (player.lastGame !== null) {
            const currentDate = new Date();
            const lastGameDays = Math.floor(lastGame.getTime() / (3600 * 24 * 1000));
            const currentDateDays = Math.floor(currentDate.getTime() / (3600 * 24 * 1000));
            daysSinceLastGame = lastGameDays - currentDateDays;
        }

        return (
            <div key={index}>
                <ListItem alignItems="flex-start">

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
                        primary={<Typography variant={"h6"} onClick={() => props.viewPlayer(player.id)}
                                             className={classes.link}>{place} {player.name}</Typography>}
                        secondary={
                            <React.Fragment>
                                Points {Math.floor(player.points)}
                            </React.Fragment>
                        }
                    />
                    {getLastGameText(player, daysSinceLastGame)}


                    <ListItemSecondaryAction>
                        {player.nakedLap ? <Tooltip title="Naked lap warning" TransitionComponent={Zoom}>
                            <WarningIcon style={{color: 'red'}}/>

                        </Tooltip> : ''}
                    </ListItemSecondaryAction>

                </ListItem>
                {index + 1 !== props.players.size ? <Divider variant="inset" component="li"/> : ''}
            </div>

        )
    };


    const listPlayers = !!props.players && props.players.toIndexedSeq()
        .map(displayPlayer);

    const getLastGameText = (player, daysSinceLastGame) => {
        if (player.lastGame !== null && daysSinceLastGame !== 0) {
            return (<Typography variant={"subtitle2"}>Last game {daysSinceLastGame} days ago</Typography>);
        }
        if (daysSinceLastGame === 0) {
            return (<Typography className={classes.text} variant={"subtitle2"}>Last game today</Typography>)
        }

        if (daysSinceLastGame === 1) {
            return (<Typography variant={"subtitle2"}>Last one day ago</Typography>)
        }
        return ''

    };


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


            <VersionBuild/>

        </div>
    )


}


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderWidth: 0.5,

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
    text: {
        marginTop: 17,
        marginRight: 20
    }

}));

