'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Course_Slots", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			order: {
				type: Sequelize.INTEGER,
			},
			courseId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Courses", // name of your model
					key: "id",
				},
				allowNull: false,
				onDelete: "CASCADE",
			},
			lessonId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Lessons", // name of your model
					key: "id",
				},
				onDelete: "CASCADE",
			},
			moduleId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Modules", // name of your model
					key: "id",
				},
				onDelete: "CASCADE",
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
		await queryInterface.dropTable("Course_Slots");
	},
};

