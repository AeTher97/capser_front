import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {useTheme} from "@material-ui/core";
import axios from "axios";

export default () => {

    const theme = useTheme();


    const [version, setVersion] = useState(null);
    useEffect(() => {
        const versionUrl = `${process.env.REACT_APP_CAPSER_BACKEND}/stats/version`;
        axios.get(versionUrl).then((res) => {
                setVersion(res.data.version);
            }
        )
    }, []);

    return (<Typography style={{textAlign: "right", fontSize: 12, marginTop: 10, color: theme.palette.text.disabled}}>Capser
            build {Math.round(version).toFixed(2)} Made with Love by Mike</Typography>
    )
}