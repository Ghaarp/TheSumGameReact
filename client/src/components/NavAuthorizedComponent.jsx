import React, {useState} from 'react';
import NewGameButton from "./NewGameButton";
import {Button, Form, FormControl} from "react-bootstrap";
import ContinueGameButton from "./ContinueGameButton";
import {observer} from "mobx-react-lite";
import {BESTRESULTS_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const NavAuthorizedComponent = observer(() => {
    const [gameId, setGameId] = useState('');

    return (
        <div className="d-flex">
            <NewGameButton className="me-2" variant="outline-light">New game</NewGameButton>
            <Form className="d-flex">
                <FormControl
                    placeholder="Enter game ID"
                    className="me-2"
                    aria-label="FindGameByID"
                    value={gameId}
                    onChange={event => setGameId(event.target.value.replace(/\D/g, ''))}
                />
                <ContinueGameButton
                    className="me-2"
                    variant="outline-light"
                    gameId={gameId}/>
            </Form>
        </div>
    );
});

export default NavAuthorizedComponent;