require('dotenv').config();

const cors = require('cors');
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const errorHandlingMiddleware = require('./middleware/errorHandling');
const PORT = process.env.PORT;


const app = express();

app.use(cors());
app.use(express.json());

app.use('/main', router);
app.use(errorHandlingMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(parseInt(PORT), () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start() ;