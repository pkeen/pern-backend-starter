const {
	sequelize,
	User,
	Course,
	Lesson,
	Module,
	CourseSlot,
} = require("../models/index");
const {
	testConnection,
	alterSynchronize,
	seedDatabse,
} = require("./syncAndSeed");
const userSeed = require("../seeders/user-seed");
const seedCourses = require("../seeders/courses-seed");
const lessonSeed = require("../seeders/lesson-seed");
const moduleSeed = require("../seeders/module-seed");
const slotSeed = require("../seeders/course-slot-seed");

const devSyncMode = async () => {
	await testConnection(sequelize);
	// await alterSynchronize(sequelize);
	await alterSynchronize(sequelize);

	// await sequelize.sync({force: true})

	// seed user?
	const userCount = await User.count();
	console.log("User Count:", userCount);
	if (userCount < 10) {
		await userSeed.up();
	}

	// Course.sync({force: true})
	// seed courses?
	const courseCount = await Course.count();
	console.log("Course count:", courseCount);
	if (courseCount < 20) {
		await seedCourses.up();
	}

	// Module seed
	const moduleCount = await Module.count();
	console.log("module count:", moduleCount);
	if (moduleCount < 30) {
		await moduleSeed.up();
	}
	// Lesson seed
	const lessonCount = await Lesson.count();
	console.log("Lesson count:", lessonCount);
	if (lessonCount < 50) {
		await lessonSeed.up();
	}

	// Slot seed
	const slotCount = await CourseSlot.count();
	console.log("slot count:", slotCount);
	if (slotCount < 60) {
		await slotSeed.up();
	}
};

module.exports = devSyncMode;
