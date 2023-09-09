
const { sequelize } = require("../models");

const forceSynchronize = async (sequelize) => {
	try {
		await sequelize.sync({ force: true });
		console.log("Tables dropped and recreated");
	} catch (err) {
		console.error("Unable to sync databse", err);
	}
};

const alterSynchronize = async (sequelize) => {
	try {
		await sequelize.sync({ alter: true });
		console.log("Tables altered");
	} catch (err) {
		console.error("Unable to sync databse", err);
	}
}

const seedDatabse = async (sequelize, up) => {
	try {
		await up(sequelize);
	} catch (err) {
		console.error("failed to seed database", err);
	}
};

const testConnection = async (sequelize) => {
	try {
		await sequelize.authenticate();
		console.log("Database connection established successfully.");
	} catch (err) {
		console.error("Unable to connect to the database:", err);
	}
};

const devSyncAndSeed = async (sequelize, up) => {
	await testConnection(sequelize);
	await forceSynchronize(sequelize);
	await seedDatabse(sequelize, up);
};

module.exports = { devSyncAndSeed , testConnection, seedDatabse, alterSynchronize, forceSynchronize };
