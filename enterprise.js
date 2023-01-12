const Sequelize = require('sequelize')
const database = require('./db')

const Enterprise = database.define('enterprise', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    originador: {
        type: Sequelize.STRING(200),
        allowNull: false,


    },
    doc_originador: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cendente: {
        type: Sequelize.STRING(200),
    },
    cendente_doc: {
        type: Sequelize.DECIMAL,
        allowNull: false,


    },
    cdb: {
        type: Sequelize.DECIMAL,

    }
    ,
    cliente: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    cpf_cnpj: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    adress: {
        type: Sequelize.STRING(200),
    },
    cep: {
        type: Sequelize.DECIMAL,

    },
    city: {
        type: Sequelize.STRING(200),
    },
    uf: {
        type: Sequelize.STRING(5),

    },
    enterprise_value: {
        type: Sequelize.DECIMAL

    },
    enterprise_rate_fees: {
        type: Sequelize.DECIMAL

    },
    portion: {
        type: Sequelize.DECIMAL

    },
    main: {
        type: Sequelize.DECIMAL

    },
    fees: {
        type: Sequelize.DECIMAL

    },
    iof: {
        type: Sequelize.DECIMAL

    },
    commission: {
        type: Sequelize.DECIMAL

    },
    commission: {
        type: Sequelize.DECIMAL

    },
    total_installments: {
        type: Sequelize.DECIMAL

    },
    installments: {
        type: Sequelize.DECIMAL

    },
    multa: {
        type: Sequelize.DECIMAL

    },
    mora: {
        type: Sequelize.DECIMAL

    },
    due_date: {
        type: Sequelize.DATE

    },
    ccb_date: {
        type: Sequelize.DATE

    },
    prince: {
        type: Sequelize.DECIMAL

    },


});
module.exports = Enterprise;