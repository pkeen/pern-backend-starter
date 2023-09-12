const { faker } = require("@faker-js/faker");
const { sequelize, Course, User } = require("../models/index");

module.exports = {
	up: async () => {
		const queryInterface = sequelize.getQueryInterface();

		const courseMin = await Course.min("id");
		const courseMax = await Course.max("id");

		const userMin = await User.min("id");
		const userMax = await User.max("id");

		for (let i = 0; i < 50; i++) {
			// create 50 orders assigned with random course and user
			const orderId =
				Math.floor(Math.random() * (courseMax - courseMin + 1)) +
				courseMin;
			const course = await Course.findByPk(orderId);
			await queryInterface.bulkInsert("Orders", [
				{
					courseId: course.id,
					total: course.price,
					userId:
						Math.floor(Math.random() * (userMax - userMin)) +
						userMin,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		}
	},
	down: async () => {
		const queryInterface = sequelize.getQueryInterface();
		// Remove all courses
		await queryInterface.bulkDelete("Orders", null, {});
	},
};
