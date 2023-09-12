'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Courses", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
			},
			isPublished: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			isCurated: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			price: {
				type: Sequelize.DECIMAL,
				defaultValue: 0,
				validate: {
					min: 0,
				},
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Users", // name of your model, not the table name
					key: "id",
				},
				allowNull: false,
				onDelete: "CASCADE",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Courses");
	},
};
