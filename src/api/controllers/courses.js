const { User, Course } = require("../../db/models/index");
const handleError = require("../utils/handleError");
const validateAndFormatParams = require("../utils/validateAndFormatParams");

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

const destroy = async (req, res) => {
	try {
		const id = req.params.id;

		const result = await Course.destroy({
			where: { id: id },
		});

		console.log(result);
		if (result === 0) {
			res.status(404).send("Course not found");
		} else {
			res.status(200).send("Course deleted successfully");
		}
	} catch (err) {
		res.status(500).send(error.message);
	}
};

const update = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		console.log("id:", id);

		console.log(req.body)

		const [numberOfAffectedRows, affectedRows] = await Course.update(
			req.body,
			{
				where: { id: id },
				returning: true, // needed for affectedRows to be populated
			}
		);

		console.log("numberOfAffectedRows", numberOfAffectedRows);
		console.log("affectedRows", affectedRows);

		if (numberOfAffectedRows === 0) {
			res.status(404).send("Course not found");
		} else {
			res.status(200).json(affectedRows[0]);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
};

module.exports = {
	index,
	create,
	destroy,
	update,
};
