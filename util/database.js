const Sequelize=require('sequelize');

const sequelize = new Sequelize('node-complete','root','02011999', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;