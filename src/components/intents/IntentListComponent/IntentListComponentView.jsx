import React from "react";
import Card from "@material-ui/core/Card";
import useTileStyle from "../../../styles/TileStyles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import {makeStyles} from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ErrorAlert from "../../misc/ErrorAlert";
import CenteredLoadingAnimation from "../../misc/CenteredLoadingAnimation";

export default function (props) {

    const tileStyles = useTileStyle();
    const classes = useStyles();

    const displaySingleIntent = (intent, index) => {
        let actionButton = null;
        let childrenIntents = null;

        if (intent.followupIntentInfo && intent.followupIntentInfo.length) {
            const actionIcon = (intent.expanded ? <ExpandLess/> : <ExpandMore/>);

            actionButton = <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="expand" onClick={() => props.onIntentExpand(intent)}>
                    {actionIcon}
                </IconButton>
            </ListItemSecondaryAction>;

            childrenIntents = (
                <Collapse in={intent.expanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className={classes.nested}>
                        {intent.followupIntentInfo.map((info, followupIndex) => {
                            let followup = props.intents.get(info.followupIntentName);
                            return (displaySingleIntent(followup, index + '-' + followupIndex))
                        })}
                    </List>
                </Collapse>)


        }

        return (
            <div key={index} test-id="intent-list-item">
                <ListItem button
                          onClick={() => {
                              console.log(intent);
                              props.navigateToEditScreen(intent)
                          }}>
                    <ListItemText primary={intent.displayName}/>
                    {actionButton}
                </ListItem>
                {childrenIntents}

            </div>
        )
    };


    const listItems = !!props.intents && props.intents.toIndexedSeq()
        .filter(item => !item.parentFollowupIntentName)
        .map(displaySingleIntent);


    return (
        <Card className={tileStyles.card} test-id="intent-list">

            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        All intents
                    </ListSubheader>
                }
                className={tileStyles.root}
            >
                <ErrorAlert error={props.error}/>
                {props.isLoading ? <CenteredLoadingAnimation/> : listItems}
            </List>
        </Card>
    )

}


const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    centeredRow: {
        display: 'flex',
        justifyContent: 'center'
    }
}));