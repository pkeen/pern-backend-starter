'use strict';

/** @type {import('sequelize-cli').Migration} */
"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Lessons", {
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
			text: {
				type: Sequelize.TEXT,
			},
			videoLink: {
				type: Sequelize.STRING,
			},
			isPublished: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			isFree: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Users", // name of your model, not the table name
					key: "id",
				},
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
		await queryInterface.dropTable("Lessons");
	},
};

