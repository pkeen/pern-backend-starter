const { sequelize } = require("../src/db/models/index");
const { testConnection , forceSynchronize } = require("../src/db/utilities/syncAndSeed");

// const synchronize = async (sequelize) => {
// 	try {
// 		await sequelize.sync({ force: true });
// 		console.log("Tables dropped and recreated");
// 	} catch {
// 		console.error("Unable to sync databse", error);
// 	}
// };


module.exports = async (globalConfig, projectConfig) => {
	// test connect to db
	testConnection(sequelize);
	// try {
	// 	await sequelize.authenticate();
	// 	console.log("Database connection has been established successfully.");
	// } catch (error) {
	// 	console.error("Unable to connect to the database:", error);
	// }

	// force sync the data
	await forceSynchronize(sequelize);
	// seed data
};
