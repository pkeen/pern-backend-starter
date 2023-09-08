const { faker } = require("@faker-js/faker");
const {sequelize} = require("../models/index")
// const { Sequelize } = require("sequelize");

module.exports = {
	up: async () => {
        const queryInterface = sequelize.getQueryInterface()
		// Create 10 users
		for (let i = 0; i < 10; i++) {
			const user = await queryInterface.bulkInsert(
				"Users",
				[
					{
						name: faker.person.fullName(),
						email: faker.internet.email(),
						password: faker.internet.password(), // Added password field here
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				],
				{ returning: true }
			);

			// Create 2 courses for each user
			await queryInterface.bulkInsert("Courses", [
				{
					userId: user[0].id,
					title: faker.company.buzzPhrase(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					userId: user[0].id,
					title: faker.company.buzzPhrase(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		}
	},

	down: async () => {
        const queryInterface = sequelize.getQueryInterface();
		// Remove all courses and users
		await queryInterface.bulkDelete("Courses", null, {});
		await queryInterface.bulkDelete("Users", null, {});
	},
};
