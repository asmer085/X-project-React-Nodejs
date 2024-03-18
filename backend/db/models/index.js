'use strict'; 

const fs = require('fs'); 
const path = require('path'); 
const Sequelize = require('sequelize'); 
const basename = path.basename(__filename); 
const env = process.env.NODE_ENV || 'development'; 
const config = require(__dirname + '/../../config/database.js')[env]; 
const db = {}; 

// Kreiranje instance Sequelize-a
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Čitanje svih model fajlova u trenutnom direktorijumu
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // Za svaki model fajl, kreiraj model i dodaj ga u 'db' objekat
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Pozivanje 'associate' metode na svakom modelu (ako postoji)
// 'associate' metoda se koristi za definisanje veza između modela
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Dodavanje Sequelize instance i Sequelize konstruktora u 'db' objekat
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Izvoz 'db' objekta
module.exports = db;
