const bcrypt = require("bcrypt");
const { User, Course, sequelize } = require("../../../src/db/models/index");
const { up, down } = require("../../../src/db/seeders/simple-db-seed");
const SALT_ROUNDS = 6;

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
		// expect(retrievedUser.password).toBe(userData.password);
	});

	test("should trim whitespace of email field on saving", async () => {
		const userData = {
			name: "jon",
			email: "jd@gmail.com   ",
			password: "abcd",
		};
		const user = await User.create(userData);

		expect(user.email).toBe("jd@gmail.com");
	});

	test("should not accept empty string", async () => {
		const userData = {
			name: "",
			email: "jd@gmail.com",
			password: "absjkdsf"
		}
		 await expect(async () => {
				await User.create(userData);
			}).rejects.toThrow();
	})

	test("should remove password from json when serialized using .toJSON()", async () => {
		const userData = {
			name: "Alice",
			email: "alice@example.com",
			password: "12345",
		};
		const user = await User.create(userData);
		const userJSON = user.toJSON();

		expect(userJSON.password).toBeUndefined();
	});

	describe("Hashes password correctly", () => {
		describe("beforeSave hooks works as expected: ", () => {
			test("hashes passwords on creation", async () => {
				const userData = {
					name: "Alice",
					email: "alice@example.com",
					password: "12345",
				};
				const user = await User.create(userData);
				// const hashedToCompare = await bcrypt.hash(userData.password, SALT_ROUNDS)
				expect(user.password).not.toBe(userData.password);
				expect(bcrypt.compareSync(userData.password, user.password)).toBe(true);
				// expect(user.password).toBe(hashedToCompare);
			});

			test("should hash password when the password is updated", async () => {
				let user = await User.create({
					name: 'testuser2',
					email: "testuser2@gmail.com",
					password: "Test@12345",
				});

				user.password = "NewTest@12345";
				await user.save();

				expect(user.password).not.toBe("NewTest@12345");
				expect(bcrypt.compareSync("NewTest@12345", user.password)).toBe(
					true
				);
			});

			test("should not hash password when another field is updated without changing the password", async () => {
				let user = await User.create({
					name: "testuser3",
					email: "testuser3@gmail.com",
					password: "Test@12345",
				});

				const originalHashedPassword = user.password;

				user.name = "updatedusername";
				await user.save();

				expect(user.password).toBe(originalHashedPassword);
			});
		});
	});
});


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
