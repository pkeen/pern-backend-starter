const { sequelize } = require("../src/db/models/index");
const {
	testConnection,
	forceSynchronize,
} = require("../src/db/utilities/syncAndSeed");

module.exports = async (globalConfig, projectConfig) => {
	// test connect to db
	testConnection(sequelize);
	// force sync the data
	await forceSynchronize(sequelize);
	// seed data - done in unit tests
};
