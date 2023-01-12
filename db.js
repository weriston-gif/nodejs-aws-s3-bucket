const Sequelize = require('sequelize')
const sequelize = new Sequelize('crud', 'root', 'Alves@123', {

    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

module.exports = sequelize;
