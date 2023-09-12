"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "dev";
const config = require("../config/config")[env];

/**
 * Connect database using local config vars or connection string if on Heroku
 */

const sequelizeConnection = () => {
    const logging =
        process.env.NODE_ENV === "text"
            ? false
            : /*(...msg) => console.log(msg) */ console.log;

    let sequelize;

    if (env === "production") {
		sequelize = new Sequelize(process.env.DATABASE_URL, {
			dialect: "postgres",
			protocol: "postgres",
			dialectOptions: {
				ssl: {
					require: true,
					rejectUnauthorized: false,
				},
			},
			logging: logging,
		});
	} else {
		sequelize = new Sequelize(
			config.database,
			config.username,
			config.password,
			{
				host: config.host,
				dialect: config.dialect,
				logging: logging,
			}
		);
	}

    return sequelize;
}

module.exports = sequelizeConnection;