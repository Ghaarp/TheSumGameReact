const Router = require('express');
const userController = require('../controllers/userController')

const userRouter = Router();

userRouter.post('/login', userController.login);
userRouter.post('/registration', userController.register);
userRouter.get('/auth', userController.check)

module.exports = userRouter;
