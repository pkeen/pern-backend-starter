const { faker } = require("@faker-js/faker");
const { sequelize,  } = require("../models/index");

module.exports = {
	up: async () => {
		const queryInterface = sequelize.getQueryInterface();


		for (let i = 0; i < 40; i++) {
			// create 50 modules assigned to random user
			await queryInterface.bulkInsert("Modules", [
				{
					title: faker.company.buzzPhrase(),
					text: faker.lorem.sentences(),
					isPublished: faker.datatype.boolean(0.7),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		}
	},
	down: async () => {
		const queryInterface = sequelize.getQueryInterface();
		// Remove all courses
		await queryInterface.bulkDelete("Modules", null, {});
	},
};
