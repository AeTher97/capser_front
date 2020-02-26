import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {Map} from "immutable";
import GamesListComponentView from "./GamesListComponentView";
import Pagination from "@material-ui/lab/Pagination";
import makeStyles from "@material-ui/core/styles/makeStyles";


export default function () {

    const [gamesMap, setGamesMap] = useState(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    let currentPage = 0;
    let games;
    let numberOfPages;
    const styles = useStyles();


    useEffect(() => {

        const url = `${process.env.REACT_APP_CAPSER_BACKEND}/stats/games?pageSize=10&pageNumber=0`;

        axios.get(url)
            .then((res) => {
                games = res.data.content;
                numberOfPages = res.data.totalPages;
                setIsLoading(false);

                let newMap = new Map();

                games.forEach(game => {
                    newMap = newMap.set(game.id, game)
                });

                setGamesMap(newMap);
                setIsLoading(false);

            })
            .catch(err => {
                console.log(err.message);
                setError(err);
                setIsLoading(false)
            });


    }, [isLoading]);


    return (
        <div>
            <GamesListComponentView games={gamesMap}
                                    isLoading={isLoading}
                                    error={error}
            />
            <Pagination className={styles.pagination} count={numberOfPages} color="primary" variant="outlined"
                        shape="rounded"/>

        </div>
    )

}


const useStyles = makeStyles(theme => ({
    pagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20

    }
}));



