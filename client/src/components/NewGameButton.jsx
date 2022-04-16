import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {newGame} from "../http/gameAPI";
import {LOGIN_ROUTE, NEWGAME_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";

const NewGameButton = observer(({className, variant, children}) => {
    const {user, game} = useContext(Context);
    const isAuth = user.isAuth;
    const navigate = useNavigate();

    const startNewGame = async () => {
        if(!isAuth){
            navigate(LOGIN_ROUTE);
            return;
        }else{
            navigate(NEWGAME_ROUTE);
        }
    }

    return (
        <Button
            className={className}
            variant={variant}
            onClick={()=> startNewGame()}>{isAuth ? children : 'Login'}
        </Button>
    );
});

export default NewGameButton;