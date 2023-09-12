const { faker } = require("@faker-js/faker");
const { sequelize, Lesson, Module } = require("../models/index");

module.exports = {
	up: async () => {
		const queryInterface = sequelize.getQueryInterface();

		const lessonMin = await Lesson.min("id");
		const lessonMax = await Lesson.max("id");
		const moduleMin = await Module.min("id");
		const moduleMax = await Module.max("id");

		for (let i = 0; i < 50; i++) {
			// create module slots with random lesson
			await queryInterface.bulkInsert("Module_Slots", [
				{
					order: Math.floor(Math.random() * 12),
					lessonId:
						Math.floor(
							Math.random() * (lessonMax - lessonMin + 1)
						) + lessonMin,
					moduleId:
						Math.floor(
							Math.random() * (moduleMax - moduleMin + 1)
						) + moduleMin,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		}
	},
	down: async () => {
		const queryInterface = sequelize.getQueryInterface();
		// Remove all courses
		await queryInterface.bulkDelete("Module_Slots", null, {});
	},
};
