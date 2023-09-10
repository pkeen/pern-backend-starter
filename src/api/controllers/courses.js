const { User, Course } = require("../../db/models/index");
const handleError = require("../utils/handleError");
const validateAndFormatParams = require('../utils/validateAndFormatParams');

const index = async (req, res) => {

	// Using the validateAndFormatParams to change fks to ints from strings
	const params = req.query;
	const query = validateAndFormatParams(Course, params);
	// console.log(query);
	try {
		const courses = await Course.findAll({
			where: query,
			include: { model: User, attributes: ["name"] },
		});
		res.json(courses);
	} catch (err) {
		res.json(err);
	}
};

const create = async (req, res) => {
	try {
		const data = { ...req.body, userId: parseInt(req.user.id) };
		await Course.create(data);
		res.status(201).json("Course created");
	} catch (err) {
		console.log("sequelize error: ", err);
		const error = handleError(err);
		console.log(error);
		res.status(error.status).json(error.formatError());
	}
};

module.exports = {
	index,
	create,
};
