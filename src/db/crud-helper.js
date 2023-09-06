const { User, Course, sequelize } = require("./models/index");

async function main() {
	try {
		// Test the database connection
		await sequelize.authenticate();
		console.log("Database connection established successfully.");
        
        await sequelize.sync({force: true})
        console.log("Database reset")

		// Build a user instance
		const jane = User.build({ name: "Jane" , email: "jane@gmail.com", password: "jane69"});

		console.log(jane.name); // Should be "Jane"

		// Save the user instance to the database
		await jane.save();
		console.log("User was saved to the database.");

        const course = Course.build({title: 'Changing a tyre', userId: jane.id })

        await course.save();
	} catch (err) {
		console.error("Unable to connect to the database:", err);
	} finally {
		// Close the database connection
		await sequelize.close();
	}
}

// Run the main function
main();
