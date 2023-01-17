const Sequelize = require('sequelize')
require("dotenv").config()
const sequelize = new Sequelize(process.env.DATA_TABLE_NAME, process.env.DATA_USER, process.env.DATA_PASSWORD, {

    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        console.log('Creating tables ===================');
        sequelize.sync().then(() => {
            console.log('=============== Tables created per model');
        })
            .catch(err => {
                console.error('Unable to create tables:', err);
            })
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
