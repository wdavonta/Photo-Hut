const path = require('path');
const express = require('express');
//const session = require('express-session');
const helpers = require('./utils/helpers');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || process.env.D_PORT;

const sequelize = require('./config/connection')
//const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});