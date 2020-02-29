import React, {useEffect, useState} from "react";
import axios from "axios";
import {Map} from "immutable";
import {useHistory} from "react-router-dom";


import GamesListComponentView from "./GamesListComponentView";


export default function (props) {

    const [gamesMap, setGamesMap] = useState(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    let games;
    const history = useHistory();


    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        setIsLoading(true);
    };

    const viewPlayer = (id) => {
        console.log(id);
        history.push(`/profile?id=${id}`);
    };


    useEffect(() => {
        let url = '';
        console.log('tutaj')

        if (props.id === null) {

            url = `${process.env.REACT_APP_CAPSER_BACKEND}/stats/games?pageSize=10&pageNumber=${page - 1}`;
        }

        if (props.id !== null) {

            url = `${process.env.REACT_APP_CAPSER_BACKEND}/stats/games?pageSize=10&pageNumber=${page - 1}&id=${props.id}`;
        }


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
            {console.log('no xd')}
            <GamesListComponentView games={gamesMap}
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



