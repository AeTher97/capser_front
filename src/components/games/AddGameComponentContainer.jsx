import React, {useContext, useEffect} from 'react';
import useFieldValidation from "../../utils/FieldValidation";
import AddGameComponentView from "./AddGameComponentView";
import {validatePoints, validateSinks} from "../../utils/GameValidation";
import axios from "axios";
import {AuthenticationContext} from "../../utils/AuthenticationContext";

const AddGameComponentContainer = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [gameError, setGameError] = React.useState(null);
    const {user} = useContext(AuthenticationContext);
    const [players, setPlayers] = React.useState([]);

    useEffect(() => {
        const url = `${process.env.REACT_APP_CAPSER_BACKEND}/stats/all/players`;
        axios.get(url, {withCredentials: true})
            .then((res) => {
                setIsLoading(false);
                setPlayers(res.data);

            })
            .catch(err => {
                console.log(err.message);
                setIsLoading(false)
            });
    }, []);


    const [gameType, setGameType] = React.useState('');
    const [opponent, setOpponent] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [opponentHelperTest, setOpponentHelperText] = React.useState('');
    const [gameTypeHelperText, setGameTypeHelperText] = React.useState('');

    const playerScoreField = useFieldValidation('', validatePoints);
    const opponentScoreField = useFieldValidation('', validatePoints);
    const playerSinksField = useFieldValidation('', validateSinks);
    const opponentSinksField = useFieldValidation('', validateSinks);

    const postGame = () => {
        const url = `${process.env.REACT_APP_CAPSER_BACKEND}/action/log`;
        let gameTypeEnum = '';
        if (gameType === 'suddenDeath') {
            gameTypeEnum = 'SUDDEN_DEATH';
        } else if (gameType === 'overtime') {
            gameTypeEnum = 'OVERTIME';
        }
        const data = {
            playerId: user.id,
            opponentId: opponent,
            playerScore: playerScoreField.value,
            opponentScore: opponentScoreField.value,
            playerSinks: playerSinksField.value,
            opponentSinks: opponentSinksField.value,
            gameType: gameTypeEnum
        };
        console.log(data);
        axios.post(url, data, {withCredentials: true})
            .then((res) => {
                setSuccess(true);
            })
            .catch(err => {
                console.log(err.message);
                setGameError('Error posting game to server');
            });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccess(false);
        setGameError(null);
        setGameTypeHelperText('');
        setOpponentHelperText('');

        if (gameType === '') {
            setGameTypeHelperText('Select Game Type');

        }

        if (opponent === '') {
            setOpponentHelperText('Select Opponent');

        }

        if (parseInt(playerScoreField.value) > parseInt(playerSinksField.value)) {
            setGameError({message: 'You cannot score more than you sank!'});
            return;
        }

        if (parseInt(opponentScoreField.value) > parseInt(opponentSinksField.value)) {
            setGameError({message: 'Opponent cannot score more than they sank!'});
            return;
        }

        const playerScoreFieldError = playerScoreField.validate();
        const opponentScoreFieldError = opponentScoreField.validate();
        const playerSinksFieldError = playerSinksField.validate();
        const opponentSinksFieldError = opponentSinksField.validate();

        if (!playerScoreFieldError && !opponentScoreFieldError && !playerSinksFieldError && !opponentSinksFieldError && gameType !== '' && opponent !== '') {
            if (user.username === opponent.name) {
                setGameError({message: 'You cannot play against yourself!'});
                return;
            }

            if (gameType === 'suddenDeath') {
                if (parseInt(playerScoreField.value) > 11 || parseInt(opponentScoreField.value) > 11) {
                    setGameError({message: 'Player score cannot be more than 11 points!'});
                    return;
                }

                if ((parseInt(playerScoreField.value) === 11 && parseInt(opponentScoreField.value) !== 11) ||
                    (parseInt(playerScoreField.value) !== 11 && parseInt(opponentScoreField.value) === 11)) {
                    postGame();
                    console.log('posted')

                } else {
                    setGameError({message: 'Sudden death game has to end with one of the players having 11 points!'});
                    return;
                }
            } else if (gameType === 'overtime') {
                if (parseInt(playerScoreField.value) > 11 || parseInt(opponentScoreField.value) > 11) {
                    if ((parseInt(playerScoreField.value) - 2 === parseInt(opponentScoreField.value)) || (parseInt(playerScoreField.value) === parseInt(opponentScoreField.value) - 2)) {
                        postGame();
                        console.log('posted')

                    } else {
                        setGameError({message: 'Overtime game has to end with one of the players 2 points more than other and more than 10 points!'});
                        return;
                    }
                } else {
                    if ((parseInt(playerScoreField.value) - 1 > parseInt(opponentScoreField.value)) || (parseInt(playerScoreField.value) < parseInt(opponentScoreField.value) - 1)) {
                        postGame();
                        console.log('posted')
                    } else {
                        setGameError({message: 'Overtime game has to end with one of the players 2 points more than other and more than 10 points!'});
                        return;
                    }

                }
            }
            console.log('set users');


        }

    };


    const changeGameType = (event) => {
        setGameType(event.target.value);
    };

    const changeOpponent = (event) => {
        setOpponent(event.target.value);
    };

    return <AddGameComponentView
        opponent={opponent}
        gameType={gameType}
        playerScoreField={playerScoreField}
        opponentScoreField={opponentScoreField}
        playerSinksField={playerSinksField}
        opponentSinksField={opponentSinksField}
        idLoading={isLoading}
        players={players}
        gameError={gameError}
        success={success}
        opponentHelperText={opponentHelperTest}
        gameTypeHelperText={gameTypeHelperText}
        changeGameType={changeGameType}
        changeOpponent={changeOpponent}
        handleSubmit={handleSubmit}/>;
};

export default AddGameComponentContainer;