import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button} from "react-bootstrap";
import {continueGame} from "../http/gameAPI";
import {NEWGAME_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const ContinueGameButton = observer(({className, variant, gameId})  => {

    const {game} = useContext(Context);
    const navigate = useNavigate();

    const continueGameClick = async () => {
        if(gameId == undefined)
            return;

        navigate(NEWGAME_ROUTE, {
            state: {
                gameId
            }
        });
    }

    return (
        <Button
            className={className}
            variant={variant}
            onClick={() => continueGameClick()}>Continue
        </Button>
    );
});

export default ContinueGameButton;