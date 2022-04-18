const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    process.env.DATABASE_URL,
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

