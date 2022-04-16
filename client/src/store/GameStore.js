import {makeAutoObservable} from "mobx";

export default class GameStore{
    constructor(data) {
        this._gameId = data.gameId;
        this._playedSeq = data.playedSeq;
        this._generatedSeq = data.generatedSeq;
        this._turnsLeft = data.turnsLeft;
        this._result = data.result;
        this._isTopScore = data.isTopScore;
        makeAutoObservable(this);
    }

    ////////////////////////////////////////////////
    get gameId(){
        return this._gameId;
    }

    get playedSeq(){
        return this._playedSeq;
    }

    get generatedSeq(){
        return this._generatedSeq;
    }

    get turnsLeft(){
        return this._turnsLeft;
    }

    get result(){
        return this._result;
    }

    get isTopScore(){
        return this._isTopScore;
    }

}