const { sequelize, User, Course } = require("../models/index");
const {
	testConnection,
	alterSynchronize,
	seedDatabse,
} = require("./syncAndSeed");
const userSeed = require("../seeders/user-seed");
const seedCourses = require("../seeders/courses-seed");

const devSyncMode = async () => {
	await testConnection(sequelize);
	// await alterSynchronize(sequelize);
	await alterSynchronize(sequelize);

	// await sequelize.sync({force: true})

	// seed user?
	const userCount = await User.count();
	console.log("User Count", userCount);
	if (userCount < 10) {
		await userSeed.up();
	}

	// Course.sync({force: true})
	// seed courses?
	const courseCount = await Course.count();
	console.log("course count", courseCount);
	if (courseCount < 20) {
		await seedCourses.up();
	}
};

module.exports = devSyncMode;
