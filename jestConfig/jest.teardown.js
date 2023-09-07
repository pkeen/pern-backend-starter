const { sequelize } = require("../src/db/models/index");


module.exports = async () => {
	try {
		await sequelize.close();
		console.log("Database connection has been closed successfully.");
	} catch (error) {
		console.log("Failed to close the database connection:", error);
	}
};
