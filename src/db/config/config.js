const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	dev: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: `${process.env.DB_NAME}_dev`,
		host: process.env.DB_HOST,
		dialect: "postgres",
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: `${process.env.DB_NAME}_test`,
		host: process.env.DB_HOST,
		dialect: "postgres",
	},
	production: {
		username: "root",
		password: null,
		database: "database_production",
		host: "127.0.0.1",
		dialect: "postgres",
	},
};
