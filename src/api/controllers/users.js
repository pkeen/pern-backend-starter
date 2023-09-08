const jwt = require("jsonwebtoken");
const { User } = require("../../db/models/index");

const createJWT = (user) => {
	return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "24h" }); // try doing this asynchronously
};

const create = async (req, res) => {
	try {
		const user = await User.create(req.body);
		// TODO: needs error handling
		const token = createJWT(user);

		res.json({ token });
	} catch (err) {
		console.log(err);
		if (err.errors[0].type === 'unique violation') {
			console.log("email taken")
		}
		err.message = 'really bad request there'
		res.status(400).json(err);
	}

	// const name = req.body.name;
	// res.json({ name });
};

module.exports = {
	create,
};
