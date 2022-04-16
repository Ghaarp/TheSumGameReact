const {Round} = require('../models/models');
const GameLogic = require('../Game/logic');

class GameController {
    async play(req, res, next) {

        let {gameId} = req.params;
        let {user} = req;
        console.log(user);

        if (gameId == undefined || gameId == '0'){
            gameId = await GameLogic.createGame(user.id);
            if(gameId == undefined)
            {
                return res.json("Game not created");
            }
        }
        else
        {
            gameId = await GameLogic.makeTurn(gameId, user.id, undefined);
            if(gameId == undefined)
            {
                return res.json("Game not found");
            }
        }
        console.log(gameId);
        return res.json(await GameLogic.formResult(gameId));
    }

    async makeTurn(req, res, next) {
        const {gameId, turn} = req.body;
        let {user} = req;

        const gameRound = await GameLogic.makeTurn(gameId, user.id, turn);
        if(gameRound == undefined)
        {
            return res.json("Game not found");
        }
        return res.json(await GameLogic.formResult(gameId));
    }

    async records(req, res, next){
        const {user} = req;
        const records = await GameLogic.getBestResults(0, 2);
        let userRecords = undefined;
        if(user != undefined)
            userRecords = await GameLogic.getBestResults(0, 2, user.id);
        return res.json({records, userRecords});
    }

}

module.exports = new GameController();