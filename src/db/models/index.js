// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "development";
// const config = require('./config')[env];
const config = require("../config/config")[env];

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,
		dialect: config.dialect,
	}
);

const models = {
	User: require("./user")(sequelize, Sequelize.DataTypes),
  Course: require('./course')(sequelize, Sequelize.DataTypes)
	// Course: require("./models/Course")(sequelize, Sequelize.DataTypes),
	// add more models here
};

Object.keys(models).forEach((modelName) => {
	if ("associate" in models[modelName]) {
		models[modelName].associate(models);
	}
});

module.exports = { sequelize, ...models };

// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connection established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// const db = {}
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// //connecting to models
// db.users = require('./user') (sequelize, DataTypes)

// module.exports = db;
