const { User, Course, sequelize } = require("../../../src/db/models/index");
const { up, down } = require("../../../src/db/seeders/simple-db-seed");
// Needs set up

beforeEach(async () => {
	await up();
});

afterEach(async () => {
	await down();
});

// basic test
test("it should be true", () => {
	expect(true).toBe(true);
});

// Basic test, add a User with correct details
describe("User model", () => {
	test("should create a user and retrieve it with matching fields", async () => {
		// Step 1: Create a new user
		const userData = {
			name: "Alice",
			email: "alice@example.com",
			password: "12345",
		};

		const user = await User.create(userData);

		// Step 2: Retrieve the user and check the fields
		const retrievedUser = await User.findByPk(user.id);

		expect(retrievedUser.name).toBe(userData.name);
		expect(retrievedUser.email).toBe(userData.email);

		// Note: For the password, if you are hashing it before saving to the DB,
		// you'll need to hash the original password and compare it to the hashed password in the DB
		expect(retrievedUser.password).toBe(userData.password);
	});
});

// // Test the relationship onDelete 'CASCADE'
// describe("Course model belongs to User model", () => {
// 	describe("Course model has onDelete CASCADE behaviour", () => {
// 		test("should delete course when user is deleted", async () => {
// 			// step 1: create user
// 			// store user.id for later
// 			const userData = {
// 				firstName: "Fred",
// 				lastName: "west",
// 				email: "fred@hotmail.com",
// 				password: "1234c",
// 			};
// 			const user = await User.create(userData);
// 			const userID = user.id;

// 			// step 2 create course
// 			const courseData = {
// 				title: "course name",
// 				userId: user.id,
// 			};
// 			const course = await Course.create(courseData);

// 			// step 3 delete the user
// 			await user.destroy();
// 			//step 4 retrieve courses where user is creator
// 			const userCourses = await Course.findAll({
// 				where: {
// 					userId: userID,
// 				},
// 			});

// 			expect(userCourses.length).toBe(0);
// 		});
// 	});
// });

//refactor test for seeded db (no create needed)
// Test the relationship onDelete 'CASCADE'
describe("Course model belongs to User model", () => {
	describe("Course model has onDelete CASCADE behaviour", () => {
		test("should delete course when user is deleted", async () => {
			// step 1: get user with lowest ID
			const user = await User.findOne({ order: [["id", "ASC"]] });
			// step 2: store the user id for later
			const userID = user.id;

			// step 3 delete the user
			await user.destroy();
			//step 4 retrieve courses where user is creator
			const userCourses = await Course.findAll({
				where: {
					userId: userID,
				},
			});

			expect(userCourses.length).toBe(0);
		});
	});
});
