const Sequelize = require('sequelize')
require("dotenv").config()
const sequelize = new Sequelize('DB-ENTERPRISE', 'root', 'Alves@123', {

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
