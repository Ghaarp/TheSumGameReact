import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Nav} from "react-bootstrap";
import {makeTurn} from "../http/gameAPI";

const GameFieldComponent = observer(({game, updateGame, restart}) => {
    let table = {rowsArray:[], itemPerRow: 0};

    const createRows = (gameObject) => {

        if(!gameObject) return;

        let rowsArray = [];
        const playedSeq = gameObject.playedSeq.split(':');
        const strLength = playedSeq.length;
        const itemSqrt = Math.sqrt(strLength);
        const rowCount = Math.ceil(itemSqrt);
        const itemPerRow = Math.floor(itemSqrt);


        for(let i = 0; i < rowCount;i++){
            let arr = [];
            for (let c = 0; c < itemPerRow && i*itemPerRow + c < strLength; c++){
                arr.push(playedSeq[i*itemPerRow + c]);
            }
            rowsArray.push(arr);
        }

        table = {rowsArray, itemPerRow};
    }

    const buttonMakeTurn = async (gameId, turn) => {
        makeTurn(gameId, turn).then(res => updateGame(res));
    }

    createRows(game);

    return (
        <div>
            {game ?
                <Card className="d-flex justify-content-center align-items-center">
                    <h1> Pick your card: </h1>
                    <h5 className='align-self-start'>Turns left: {game.turnsLeft}</h5>
                    {table.rowsArray.map((arr, i) => {
                        return <Nav
                            className='justify-content-center align-items-center'
                            key={i}>
                            {arr.map((value, index) =>{
                                return <Button
                                    className='me-2 mb-2'
                                    key={i*table.itemPerRow + index}
                                    onClick={() => buttonMakeTurn(game.gameId,i*table.itemPerRow + index)}>{value}</Button>;
                            })
                            }
                        </Nav>;
                    })
                    }
                    <h2 style={{color: game.turnsLeft > 0 ? 'black' : game.isTopScore ? 'green' : 'red'}}>Result: {game.result}</h2>
                    {game.isTopScore && game.turnsLeft < 1 ? <h2 style={{color: 'green'}}>New record!</h2> : ''}
                    {game.turnsLeft < 1 ? <Button
                                            variant='outline-black'
                                            onClick={restart}>Try again?</Button> : ''}
                </Card>
                :
                <div></div>
            }
        </div>
    );
});

export default GameFieldComponent;