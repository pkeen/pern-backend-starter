'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Orders", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			orderDate: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			total: {
				type: Sequelize.DECIMAL,
			},
			courseId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Courses", // name of your model
					key: "id",
				},
				onDelete: "SET NULL",
				allowNull: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Users", // name of your model
					key: "id",
				},
				onDelete: "SET NULL",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Orders");
	},
};

