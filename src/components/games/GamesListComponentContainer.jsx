import React, {useEffect, useState} from "react";
import axios from "axios";
import {Map} from "immutable";

import GamesListComponentView from "./GamesListComponentView";


export default function () {

    const [gamesMap, setGamesMap] = useState(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    let games;


    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        setIsLoading(true);
    };


    useEffect(() => {

        const url = `${process.env.REACT_APP_CAPSER_BACKEND}/stats/games?pageSize=10&pageNumber=${page - 1}`;

        axios.get(url, {withCredentials: true})
            .then((res) => {
                games = res.data.content;
                setPageNumber(res.data.totalPages);
                setIsLoading(false);

                let newMap = new Map();

                let index = 0;

                games.forEach(game => {
                    newMap = newMap.set(index, game);
                    index = index + 1;
                });


                setGamesMap(newMap);
                setIsLoading(false);

            })
            .catch(err => {
                console.log(err.message);
                setError(err);
                setIsLoading(false)
            });


    }, [page]);


    return (
        <div>
            <GamesListComponentView games={gamesMap}
                                    isLoading={isLoading}
                                    error={error}
                                    page={page}
                                    handleChange={handleChange}
                                    pageNumber={pageNumber}
            />


        </div>
    )

}



