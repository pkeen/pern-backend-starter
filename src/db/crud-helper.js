const { User, Course, sequelize } = require("./models/index");

async function main() {
	try {
		// Test the database connection
		await sequelize.authenticate();
		console.log("Database connection established successfully.");

		await sequelize.sync({ force: true });
		console.log("Database reset");

		// Build a user instance
		// const jane = User.build({ name: "Jane" , email: "jane@gmail.com", password: "jane69"});
		/// use create as build + save
		const jane = await User.create({
			name: "Jane",
			email: "jane@gmail.com",
			password: "jane69",
		});

		console.log(jane.toJSON()); // Should be "Jane"

		// Save the user instance to the database
		// await jane.save();
		console.log("User was saved to the database.");

		const course = Course.build({
			title: "Changing a tyre",
			userId: jane.id,
		});

		await course.save();

		await jane.destroy();

		// Find all courses
		const courses = await Course.findAll();
		console.log("All Courses:", JSON.stringify(courses, null, 2));

        // print all users
        const users = await User.findAll();
        console.log('All users: ', JSON.stringify(users, null, 2));

	} catch (err) {
		console.error("Unable to connect to the database:", err);
	} finally {
		// Close the database connection
		await sequelize.close();
	}
}

// Run the main function
main();
