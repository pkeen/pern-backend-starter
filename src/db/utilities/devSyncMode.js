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
	await forceSynchronize(sequelize);
    const {count, row} = await User.findAndCountAll()
	if (count <= 10) {
		await seedDatabse(sequelize, up);
	}
};

module.exports = devSyncMode;
