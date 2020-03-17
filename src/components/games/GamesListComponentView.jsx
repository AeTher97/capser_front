import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CenteredLoadingAnimation from "../misc/CenteredLoadingAnimation";
import clsx from 'clsx';
import Pagination from "@material-ui/lab/Pagination";
import ListItem from "@material-ui/core/ListItem";
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import useTheme from "@material-ui/core/styles/useTheme";
import VersionBuild from "../misc/VersionBuild";

export default function (props) {

    const theme = useTheme();
    const classes = useStyles();


    const displayGame = (game, index) => {
        const date = new Date(game.gameDate);
        return (<ExpansionPanel key={index} expanded={expanded === index} onChange={handleChange(index)}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                    {game.gameType === 'SUDDEN_DEATH' ?
                        <Typography className={classes.headingColumn}>Sudden Death</Typography> : ''}
                    {game.gameType === 'OVERTIME' ?
                        <Typography className={classes.headingColumn}>Overtime</Typography> : ''}
                    <div className={classes.headingColumn}>
                        <Typography>
                            <span
                                style={game.winner === game.playerName ? {color: 'lime'} : {color: 'red'}}>{game.playerName}
                            </span>
                            <span> vs </span>
                            <span
                                style={game.winner === game.opponentName ? {color: 'lime'} : {color: 'red'}}>{game.opponentName}
                            </span>
                        </Typography>
                    </div>
                    <Typography className={classes.headingColumn}>{date.toLocaleString("en-US")}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <div className={classes.column}>
                        <Typography variant='subtitle2' className={classes.subtitleText}>
                            Score {game.playerScore} : {game.opponentScore}
                        </Typography>
                        <Typography variant='subtitle2' className={classes.subtitleText}>
                            Rebuttals {game.playerRebuttals} : {game.opponentRebuttals}
                        </Typography>
                        <Typography variant='subtitle2' className={classes.subtitleText}>
                            Sinks {game.playerSinks} : {game.opponentSinks}
                        </Typography>
                    </div>
                    <div className={classes.column}>
                        {game.playerPointsChange !== null ? getPointsChangeHeader() : ''}
                        {getPointsChange(game.playerName, game.playerPointsChange)}
                        {getPointsChange(game.opponentName, game.opponentPointsChange)}
                    </div>
                    <div className={clsx(classes.column, classes.helper)}>
                        <Typography variant='subtitle2' className={classes.subtitleText}>
                            Player profiles
                        </Typography>
                        <Typography variant='subtitle2' onClick={() => props.viewPlayer(game.playerId)}
                                    className={clsx(classes.subtitleText, classes.link)}>
                            {game.playerName}
                        </Typography>
                        <Typography variant='subtitle2' onClick={() => props.viewPlayer(game.opponentId)}
                                    className={clsx(classes.subtitleText, classes.link)}>
                            {game.opponentName}
                        </Typography>
                    </div>


                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    };

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getPointsChangeHeader = () => {
        return (<Typography variant='subtitle2'>
            Points change
        </Typography>)
    };

    const getPointsChange = (player, pointsChange) => {

        if (pointsChange !== null) {
            if (pointsChange < 0) {

                return (
                    <div>
                        <Typography variant='subtitle2' className={classes.loser}>
                            {player} {Math.floor(pointsChange)}
                        </Typography>
                    </div>)
            } else {
                return (
                    <div>
                        <Typography variant='subtitle2' className={classes.winner}>
                            {player} +{Math.floor(pointsChange)}
                        </Typography>
                    </div>)
            }

        }
    };


    const listGames = !!props.games && props.games.toIndexedSeq()
        .map(displayGame);


    return (<div>
            <ListItem>
                {!props.isLoading && props.games.size !== 0 ? <Typography variant={"h5"}>Games</Typography> : ''}
            </ListItem>
            {props.isLoading ? <CenteredLoadingAnimation/> : listGames}


            {props.games.size === 0 && !props.isLoading ?
                <div style={{textAlign: 'center'}}><PanoramaFishEyeIcon width={100} height={100}
                                                                        style={{color: 'red'}}/>
                    <Typography variant={"h5"} style={{color: 'red'}}>No games</Typography>
                </div> : ''}

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
    },
    headingColumn: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    subtitleText: {
        color: theme.palette.text.secondary,
    },
    winner: {
        color: 'lime',
    },
    loser: {
        color: 'red'
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    details: {
        alignItems: 'center',
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

    }
}));
