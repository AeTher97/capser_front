import React, {useEffect, useState} from "react";
import axios from "axios";
import {Map} from "immutable";
import PlayersListComponentView from "./PlayersListComponentView";
import {useHistory} from "react-router-dom";

export default function () {

    const [playersMap, setPlayersMap] = useState(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);

    const history = useHistory();
    let players;

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        setIsLoading(true);
    };


    useEffect(() => {
        const versionUrl = `${process.env.REACT_APP_CAPSER_BACKEND}/stats/version`;

        const url = `${process.env.REACT_APP_CAPSER_BACKEND}/stats/players?pageSize=10&pageNumber=${page - 1}`;

        axios.get(url, {withCredentials: true})
            .then((res) => {
                players = res.data.content;
                setPageNumber(res.data.totalPages);
                setIsLoading(false);

                let newMap = new Map();
                let index = 0;

                players.forEach(player => {
                    newMap = newMap.set(index, player);
                    index = index + 1;
                });

                setPlayersMap(newMap);
                setIsLoading(false);

            })
            .catch(err => {
                console.log(err.message);
                setError(err);
                setIsLoading(false)
            });


    }, [page]);

    const viewPlayer = (id) => {
        console.log(id);
        history.push(`/profile?id=${id}`);
    };


    return (
        <div>
            <PlayersListComponentView players={playersMap}
                                      isLoading={isLoading}
                                      error={error}
                                      page={page}
                                      viewPlayer={viewPlayer}
                                      handleChange={handleChange}
                                      pageNumber={pageNumber}
            />
            <div style={{height: 200}}/>


        </div>
    )

}



