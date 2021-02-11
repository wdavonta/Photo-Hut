const path = require('path');
const express = require('express');
//const session = require('express-session');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || process.env.D_PORT;

const sequelize = require('./config/connection')
//const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});