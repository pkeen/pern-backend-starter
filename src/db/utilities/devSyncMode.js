const { sequelize, User, Course } = require("../models");
const {
	testConnection,
	alterSynchronize,
	forceSynchronize,
	seedDatabse,
} = require("./syncAndSeed");

const devSyncMode = async (sequelize, up) => {
	await testConnection(sequelize);
	// await alterSynchronize(sequelize);
	await alterSynchronize(sequelize);
    const {count, row} = await User.findAndCountAll()
	console.log("count", count)
	if (count < 10) {
		await seedDatabse(sequelize, up);
	}
};

module.exports = devSyncMode;
