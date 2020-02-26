import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CenteredLoadingAnimation from "../misc/CenteredLoadingAnimation";
import Chip from "@material-ui/core/Chip";
import clsx from 'clsx';


export default function (props) {

    const [gamestMap, setGamesMap] = useState(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    const classes = useStyles();

    const displayGame = (game, index) => {
        return (<ExpansionPanel key={index} expanded={expanded === index} onChange={handleChange(index)}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.headingColumn}>Sudden Death</Typography>
                    <Typography
                        className={[classes.players, classes.headingColumn]}>{game.playerId} vs {game.opponentId}</Typography>
                    <Typography className={[classes.winner, classes.headingColumn]}>Winner {game.winner}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <div className={classes.column}>
                        <Typography>
                            Score {game.playerScore} : {game.opponentScore}
                        </Typography>
                    </div>
                    <div className={classes.column}>
                        <Chip label="Barbados" onDelete={() => {
                        }}/>

                    </div>
                    <div className={clsx(classes.column, classes.helper)}>
                        <Typography>
                            cos
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


    const listGames = !!props.games && props.games.toIndexedSeq()
        .map(displayGame);


    return (<div>
            {props.isLoading ? <CenteredLoadingAnimation/> : listGames}
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
    players: {
        color: theme.palette.text.secondary,
    },
    winner: {
        color: 'green',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    }
}));
