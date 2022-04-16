import {authHost} from "./index";
import {CustomResponse} from "./Response";

export const newGame = async () => {
    try{
        const data = await authHost.get('main/game/play');
        return new CustomResponse(false, data);
    }catch(e){
        return new CustomResponse(true, e);
    }
}

export const continueGame = async (gameId) => {
    try{
        const data = await authHost.get(`main/game/play=${gameId}`);
        return new CustomResponse(false, data);
    }catch(e){
        return new CustomResponse(true, e);
    }
}

export const makeTurn = async (gameId, key) => {
    try{
        const data = await authHost.post('main/game/maketurn', {gameId: gameId, turn: key});
        return new CustomResponse(false, data);
    }catch(e){
        return new CustomResponse(true, e);
    }
}

export const records = async () => {
    try{
        const data = await authHost.get('main/game/records');
        return new CustomResponse(false, data);
    }catch(e){
        return new CustomResponse(true, e);
    }
}