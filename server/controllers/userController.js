const {User} = require('../models/models');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const ApiError = require('../Errors/ApiError');

const generateJwt = (id, login) => {
    return jwt.sign(
        {id, login},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserController{
    async login(req, res, next){
        const {login, password} = req.body;
        if(!login || !password) {
            return next(ApiError.badRequest("No login or password"));
        }

        const foundUser = await User.findOne({where:{login}});
        if(!foundUser){
            return next(ApiError.badRequest("Wrong login or password"));
        }

        if(bcrypt.compareSync(password, foundUser.password)){
            const token = generateJwt(foundUser.id, login);
            return res.json({token});
        }else{
            next(ApiError.badRequest("Wrong login or password"));
        }
    }

    async register(req, res, next){
        const {login, password} = req.body;
        if(!login || !password) {
            return next(ApiError.badRequest("No login or password"));
        }
        console.log(`Log: ${login} Pass: ${password}`)
        const foundUser = await User.findOne({where:{login}});
        if(foundUser){
            return next(ApiError.badRequest("User already registered"));
        }
        console.log(`Log: ${login} Pass: ${password}`)
        const hashedPass = await bcrypt.hash(password, 5);
        const user = await User.create({login, password: hashedPass});
        const token = generateJwt(user.id, login);
        return res.json({token});
    }

    async check(req, res) {

    }
}

module.exports = new UserController();