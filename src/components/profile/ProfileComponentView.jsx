import Card from "@material-ui/core/Card";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SwipeableViews from 'react-swipeable-views';

import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import CenteredLoadingAnimation from "../misc/CenteredLoadingAnimation";
import Avatar from "@material-ui/core/Avatar";
import {Equalizer, Games} from "@material-ui/icons";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import StatsTab from "./StatsTab";
import {useTheme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GamesListComponentContainer from "../games/GamesListComponentContainer";
import StatsComponent from "./StatsComponent";

export default function (props) {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    function a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    const date = new Date(props.user.lastSeen);


    const classes = useStyles();
    return (
        <Card className={props.smallScreen ? classes.fullWidthCard : classes.card}>
            {!props.isLoading ? <div className={!smallScreen ? classes.flexWrapper : {}}>
                <div className={classes.mainColumn}>
                    <div style={{display: 'inline-block'}}>
                        <Avatar alt="Remy Sharp" src="/avatar.jfif"
                                style={{height: '12vw', width: '12vw', justifyContent: 'center'}}/>
                    </div>
                    <Typography variant={"h4"}>{props.user.name}</Typography>
                    {props.user.lastSeen !== null ?
                        <Typography variant={"subtitle2"}>Last active {date.toLocaleString("en-US")}</Typography> : ''}
                </div>
                <div className={classes.detailsColumn}>
                    <div style={{textAlign: 'center'}}>
                        <AppBar position="static">
                            <Tabs className={classes.navigation} textColor={'primary'}
                                  classes={{indicator: classes.indicator}}
                                  variant={"fullWidth"}
                                  value={props.card}
                                  onChange={props.handleChange}>
                                <Tab icon={< Equalizer/>} label="Stats" {...a11yProps(0)} />
                                <Tab icon={<Games/>} label="Games" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={props.card}
                            onChangeIndex={props.handleChangeIndex}
                        >
                            <StatsTab value={props.card} index={0} dir={theme.direction}>
                                <StatsComponent user={props.user}/>
                            </StatsTab>
                            <StatsTab value={props.card} index={1} dir={theme.direction}>
                                <GamesListComponentContainer id={props.user.id}/>

                            </StatsTab>
                        </SwipeableViews>


                    </div>
                </div>
            </div> : <CenteredLoadingAnimation/>}

        </Card>


    )
}

const useStyles = makeStyles(theme => ({
    navigation: {
        with: 300,
        backgroundColor: theme.palette.background.default
    },
    indicator: {
        backgroundColor: theme.palette.primary.light
    },
    card: {
        padding: theme.spacing(2),
        width: '100%',
    },
    flexWrapper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row'
    },
    fullWidthCard: {
        padding: theme.spacing(2),
        width: '100%',
    },
    mainColumn: {
        flexBasis: '30%',
        textAlign: 'center',
        marginBottom: 20

    },
    detailsColumn: {
        flexBasis: '70%',

    }
}));

StatsTab.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

