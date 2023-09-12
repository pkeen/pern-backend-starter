const { faker } = require("@faker-js/faker");
const { sequelize, User } = require("../models/index");

module.exports = {
	up: async () => {
		const queryInterface = sequelize.getQueryInterface();

		const minId = await User.min("id");
		console.log("min", minId);
		const maxId = await User.max("id");
		console.log("max", maxId);

		for (let i = 0; i < 50; i++) {
			// create 50 lessons assigned to random user
			await queryInterface.bulkInsert("Lessons", [
				{
					userId: Math.floor(Math.random() * (maxId - minId + 1)) + minId,
					title: faker.company.buzzPhrase(),
					text: faker.lorem.sentences(),
					isPublished: faker.datatype.boolean(0.7),
					isFree: faker.datatype.boolean(0.3),
					videoLink: faker.internet.url(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		}
	},
	down: async () => {
		const queryInterface = sequelize.getQueryInterface();
		// Remove all courses
		await queryInterface.bulkDelete("Lessons", null, {});
	},
};
