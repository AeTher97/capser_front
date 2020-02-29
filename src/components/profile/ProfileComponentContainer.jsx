import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ProfileComponentView from "./ProfileComponentView";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import axios from "axios";
import useTileStyle from "../../styles/TileStyles";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function () {
    const location = useLocation();
    const tileStyles = useTileStyle();


    const [user, setUser] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [card, setCard] = useState(0);

    const params = useQuery();

    useEffect(() => {
        let id = null;
        if (params === null) {
            id = JSON.parse(localStorage.getItem('user')).id;
        } else {
            id = params.get('id');
        }
        const url = `${process.env.REACT_APP_CAPSER_BACKEND}/stats/player?id=${id}`;

        axios.get(url, {withCredentials: true})
            .then((res) => {
                setIsLoading(false);
                setUser(res.data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [location]);

    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setCard(newValue);
    };

    const handleChangeIndex = index => {
        setCard(index);
    };

    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className={tileStyles.centeredRow}>

            <ProfileComponentView
                smallScreen={smallScreen}
                isLoading={isLoading}
                user={user}
                card={card}
                handleChange={handleChange}
                handleChangeIndex={handleChangeIndex}
            />


        </div>
    )
}


