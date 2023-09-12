const { faker } = require("@faker-js/faker");
const { sequelize, Course, Lesson, Module } = require("../models/index");

module.exports = {
	up: async () => {
		const queryInterface = sequelize.getQueryInterface();

		const courseMin = await Course.min("id");
		console.log(courseMin);
		const courseMax = await Course.max("id");
		console.log(courseMax);

		const lessonMin = await Lesson.min("id");
		const lessonMax = await Lesson.max("id");
		const moduleMin = await Module.min("id");
		const moduleMax = await Module.max("id");

		for (let i = 0; i < 30; i++) {
			// create 50 lessons assigned to random user
			await queryInterface.bulkInsert("Course_Slots", [
				{
					order: Math.floor(Math.random() * 12),
					courseId:
						Math.floor(
							Math.random() * (courseMax - courseMin + 1)
						) + courseMin,
					lessonId:
						Math.floor(
							Math.random() * (lessonMax - lessonMin + 1)
						) + lessonMin,
					moduleId: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					order: Math.floor(Math.random() * 12),
					courseId:
						Math.floor(
							Math.random() * (courseMax - courseMin + 1)
						) + courseMin,
					lessonId: null,
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
		await queryInterface.bulkDelete("Course_Slots", null, {});
	},
};
