import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Card, Container, Nav} from "react-bootstrap";
import {continueGame, makeTurn, newGame} from "../http/gameAPI";
import NewGameButton from "../components/NewGameButton";
import {errorHandle} from "../utils/errorHandler";
import GameStore from "../store/GameStore";
import GameFieldComponent from "../components/GameFieldComponent";
import {useLocation} from "react-router-dom";

const Game = observer(() => {
    const location = useLocation();
    const gameId = location.state?.gameId;

    const {user} = useContext(Context);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [game, setGame] = useState();

    useEffect(()=>{gameId && continueGame(gameId).then(res => updateGame(res)) ||
        game ||
        newGame().then(res => updateGame(res));
    })

    const updateGame = (res) => {
        const {response} = res;
        if (errorHandle(res, setErrorMessage, setShowError)) return;
        const newGame = new GameStore(response.data);
        setGame(newGame);
        if(location.state?.gameId) location.state.gameId = undefined;
    }

    const restart = () => {
        setGame(undefined);
    }

    return (
        <div className="justify-content-center">
            {game && <h5>Game id: {game.gameId}</h5>}
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight-500}}>
                {showError ?
                    <div className="justify-content-center align-items-center">
                        <h1>{errorMessage}</h1>
                    </div>
                    :
                    <div>
                        {game ?
                            <GameFieldComponent game={game} updateGame={updateGame} restart={restart}/>
                            :
                            <h1> Loading game... </h1>
                        }
                    </div>
                }
            </Container>
        </div>
    );
});

export default Game;