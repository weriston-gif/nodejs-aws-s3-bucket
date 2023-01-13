const Sequelize = require('sequelize')
const database = require('./db')

const Enterprise = database.define('ENTERPRISE', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    Originador: {
        type: Sequelize.STRING(200),
    },
    Doc_Originador: {
        type: Sequelize.INTEGER,
    },
    Cedente: {
        type: Sequelize.STRING(200),
    },
    Doc_Cedente: {
        type: Sequelize.INTEGER,
    },
    CCB: {
        type: Sequelize.INTEGER,
    }
    ,
    Id_externo: {
        type: Sequelize.INTEGER,
    },
    cpf_cnpj: {
        type: Sequelize.INTEGER,
    },
    Endereco: {
        type: Sequelize.STRING(200),
    },
    CEP: {
        type: Sequelize.INTEGER,
    },
    Cidade: {
        type: Sequelize.STRING(200),


    },
    UF: {
        type: Sequelize.STRING(200),

    },

    Valor_emprestimo: {
        type: Sequelize.DECIMAL(10, 2),


    },
    Taxa_juros: {
        type: Sequelize.DECIMAL(10, 2),


    },
    Parcelas: {
        type: Sequelize.DECIMAL(10, 2),

    },
    Principal: {
        type: Sequelize.DECIMAL(10, 2),

    },
    Juros: {
        type: Sequelize.DECIMAL(10, 2)

    },
    IOF: {
        type: Sequelize.DECIMAL(10, 2)

    },
    Comissao: {
        type: Sequelize.DECIMAL(10, 2)

    },
    Total_Parcelas: {
        type: Sequelize.INTEGER

    },
    Parcela: {
        type: Sequelize.INTEGER

    },
    Multa: {
        type: Sequelize.INTEGER

    },
    Mora: {
        type: Sequelize.INTEGER

    },
    Data_Emissao: {
        type: Sequelize.DATE

    },
    Data_Vencimento: {
        type: Sequelize.DATE
        
    },
    Data_Cobra_CBB: {
        type: Sequelize.DATE
        
    },
    Preco_Aquisicao: {
        type: Sequelize.INTEGER

    }



});
module.exports = Enterprise;