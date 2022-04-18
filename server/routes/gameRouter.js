const Router = require('express');
const gameRouter = Router();
const gameController = require('../controllers/gameController');
const checkIsAuthMiddleware = require('../middleware/checkIsAuthMiddleware')

gameRouter.get('/play', checkIsAuthMiddleware, gameController.play);
gameRouter.get('/play=:gameId', checkIsAuthMiddleware, gameController.play);
gameRouter.post('/maketurn', checkIsAuthMiddleware, gameController.makeTurn);
gameRouter.get('/records', gameController.records);

module.exports = gameRouter;