const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'tg_bot',
    'root',
    'root',
    {
        host: 'master.e0d355c7-4ce7-493a-a689-40a9b9e0bf13.c.dbaas.selcloud.ru',
        port: '5432',
        dialect: 'postgres'
    }
)
