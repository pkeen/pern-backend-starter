const { faker } = require("@faker-js/faker");
const { sequelize , User } = require("../models/index");

module.exports = {
    up: async () => {
        const queryInterface = sequelize.getQueryInterface()

        // get users 
        const users = await User.findAll();

        users.forEach(async (user) => {
            // let price = Math.random() < 5 ? 0 : parseFloat(faker.commerce.price()).toFixed(2);
            await queryInterface.bulkInsert("Courses", [
				{
					userId: user.id,
					title: faker.company.buzzPhrase(),
					description: faker.lorem.sentences(),
					isPublished: faker.datatype.boolean(0.7),
					isCurated: faker.datatype.boolean(0.3),
					price: Math.random() < .5 ? 0 : faker.commerce.price({max: 200}),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					userId: user.id,
					title: faker.company.buzzPhrase(),
					description: faker.lorem.sentences(),
					isPublished: faker.datatype.boolean(0.7),
					isCurated: faker.datatype.boolean(0.3),
					price: Math.random() < .5 ? 0 : faker.commerce.price({max: 200}),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
        })
	},

	down: async () => {
        const queryInterface = sequelize.getQueryInterface();
		// Remove all courses
		await queryInterface.bulkDelete("Courses", null, {});
	},
};

