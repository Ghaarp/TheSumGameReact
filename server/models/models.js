const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const tInt = DataTypes.INTEGER;
const tString = DataTypes.STRING;

const User = sequelize.define('user', {
    id: {
        type: tInt,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: tString,
        unique: true
    },
    password: {
        type: tString
    }
});

const Round = sequelize.define('rounds', {
    id: {
        type: tInt,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: tInt,
        unique: false,
        defaultValue: 0,
    },
    generatedSeq: {
        type: tString,
    },
    playedSeq: {
        type: tString,
    },
    turnsLeft: {
        type: tInt,
    },
    result: {
        type: tInt,
    },
});

//User.hasMany(Round);

module.exports = {
    User,
    Round
};