const Sequelize = require('sequelize').Sequelize;
const dbconfig = require('../../dbconfig.json');
const path = require('path');
const fs = require('fs');
const modelsPath = path.join(__dirname,'..','app','models');
    const models = fs.readdirSync(modelsPath).reduce((obj,file)=>{
        obj[file.split('.').shift()] = require(path.join(modelsPath,file));
        return obj;
    },{})

//ESCOLHE SE O BANCO VAI SER DE PRODUÇÃO, TESTE OU DESENVOLVIMENTO

exports.getConnection = () => {
    
    const connection = new Sequelize(dbconfig[process.env.DB]);
    
    for (let model of Object.values(models)) {
        model.init(connection)
    }
    for (let model of Object.values(models)) {
        if(typeof model.associate === 'function'){
            model.associate(models)
        }
        if(typeof model.hooks === 'function'){
            model.hooks()
        }
    }
    connection.sync();
    return connection;
}