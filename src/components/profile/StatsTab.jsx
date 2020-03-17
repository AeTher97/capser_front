import Typography from "@material-ui/core/Typography";
import React from "react";
import Box from "@material-ui/core/Box";
import PropTypes from 'prop-types';
import {useTheme} from "@material-ui/core";

export default function StatsTab(props) {
    const {children, value, index, ...other} = props;
    const theme = useTheme()

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            style={{backgroundColor: theme.palette.background.default}}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

StatsTab.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};