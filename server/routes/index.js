const Router = require('express');
const router = Router();
const gameRouter = require('./gameRouter');
const userRouter = require('./userRouter');
const authMiddleware = require('../middleware/authMiddleware')

router.use('/game', authMiddleware, gameRouter);
router.use('/user', userRouter);

module.exports = router;
