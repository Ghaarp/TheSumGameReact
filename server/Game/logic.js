const {Round} = require('../models/models');
const sequelize = require('../db');

class GameLogic {

    min = 1;
    max = 10;
    hiddenSymbol = 'x';
    delimiter = ':';
    turnsMax = 3;

    async createGame(userId) {

        let generatedSeq = this.generateUniqueRandomArray(this.min, this.max).join(this.delimiter);
        let result = 0;

        let playedSeq = this.hiddenGeneratedSeq(generatedSeq.split(this.delimiter)).join(this.delimiter);
        const gameRound = await Round.create( {userId, generatedSeq, playedSeq, turnsLeft:this.turnsMax, result});
        return gameRound.id;

    }

    async makeTurn(gameId, userId, turn) {

        const round = await this.findGame(gameId);

        if(round == undefined){
            return undefined;
        }

        console.log(`Round: ${round.userId} user: ${userId}`);
        if(round.userId != userId){
            return undefined;
        }

        if(turn == undefined){
            return gameId;
        }

        let {generatedSeq, playedSeq, turnsLeft} = round;

        if(turnsLeft <= 0)
        {
            return gameId;
        }
        const generatedSeqArray = generatedSeq.split(this.delimiter);
        playedSeq = playedSeq.split(this.delimiter).map((value, i) => {
            if(i == turn)
            {
                let valueAtTurn = generatedSeqArray[turn];
                if(value != valueAtTurn)
                    turnsLeft--;

                return valueAtTurn;
            }
            return value;
        }).join(this.delimiter);

        let result = playedSeq.split(this.delimiter).reduce((prev, current) => {
            return prev += current == this.hiddenSymbol ? 0 : parseInt(current);
        }, 0)

        const newTurn = await Round.update(
            {
                playedSeq,
                turnsLeft,
                result
            },
            {
                where:{
                    id: round.id,
                }
            });

        return gameId;
    }

    async getBestResults(nStart, nEnd, userId){
        let result = await sequelize.query("SELECT\n" +
                                                "rounds.id AS id, \n" +
                                                "rounds.\"userId\" AS userId,\n" +
                                                "rounds.\"result\" AS result,\n" +
                                                "users.login AS login \n" +
                                            "FROM \n" +
                                                "rounds\n" +
                                            "LEFT JOIN \n" +
                                                "users \n" +
                                            "ON rounds.\"userId\" = users.id \n" +
                                                "\n" +
                                            "WHERE\n" +
                                                "rounds.\"turnsLeft\" < 1\n" +
                                                (userId == undefined ? "" : `AND rounds.\"userId\" = ${userId}\n`) +
                                            "ORDER BY\n" +
                                                "rounds.result DESC\n"  +
                                            `LIMIT ${nEnd + 1}`);


        return result[0].filter((item, index) => {
            return index >= nStart && index <= nEnd;
        }).map((item, index) => {

            return {
                position: index + 1,
                user: item.userId,
                userName: item.login,
                result: item.result,
                gameId: item.id,
            }
        });
    }

    async findGame(gameId){
        if(gameId == undefined)
            return undefined;

        const id = gameId;
        const round = await Round.findOne(
            {
                where:{id},
            }
        )
        return round;
    }

    generateUniqueRandomArray(min, max){
        let source = [];

        for(let i=min; i < max; i++){
            source.push(i.toString());
        }

        for(let i=0; i < source.length; i++){
            let newPosition = this.getRandomInt(0, source.length);
            let currentValue = source[i];
            source[i] = source[newPosition];
            source[newPosition] = currentValue;
        }

        return source;
    }

    getRandomInt(min, max){
        return min + Math.floor(Math.random() * (max - min));
    }

    async formResult(gameId){

        let {id, playedSeq, generatedSeq, turnsLeft, result} = await this.findGame(gameId);
        let isTopScore = false;

        if(turnsLeft > 0){
            generatedSeq = playedSeq;
        }else{
            const bestResults = await this.getBestResults(0, 0);
            console.log(bestResults);
            console.log(gameId);
            if(bestResults.length > 0 && bestResults[0].gameId == gameId)
                isTopScore = true;
        }

        return {
            gameId: id,
            playedSeq,
            generatedSeq,
            turnsLeft,
            result,
            isTopScore
        }
    }

    hiddenGeneratedSeq(array){
        return array.map(() => this.hiddenSymbol);
    }

}

module.exports = new GameLogic();