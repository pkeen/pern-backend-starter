const jwt = require("jsonwebtoken");
const { User } = require("../../db/models/index");
const handleError = require('../utils/handleError');
const FriendlyError = require("../utils/friendlyError");
const bcrypt = require("bcrypt");

const createJWT = (user) => {
	return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "24h" }); // try doing this asynchronously
};

const create = async (req, res) => {
	try {
		const user = await User.create(req.body);
		// TODO: needs error handling
		const token = createJWT(user);

		res.status(201).json({ token });
	} catch (err) {
		const error = handleError(err);
		console.log(error);
		res.status(error.status).json(error.formatError());
	}
};

const login = async (req, res) => {
	console.log(req.body);
	try {
		const user = await User.findOne({ where: { email: req.body.email } });
		if (!user) {
			throw new FriendlyError(
				"No user found with the specified email.",
				404,
				"UserNotFound"
			);
		}

		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) {
			throw new FriendlyError(
				"The password you enetered did not match our records",
				401,
				"InvalidPassword"
			);
		}

		const token = createJWT(user);

		res.status(202).json({ token });
	} catch (err) {
		if (err instanceof FriendlyError) {

			res.status(err.status).json(err.formatError());
		} else {
			// This is where you would handle other types of errors - those not created by you
			console.error(err); // log the error for debugging purposes
			res.status(500).json({
				error: {
					code: "unknown_error",
					message: "An unexpected error occurred",
				},
			});
		}
	}
};

module.exports = {
	create,
	login,
};
