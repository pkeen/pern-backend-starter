const { User, Course } = require("../../db/models/index");
const handleError = require('../utils/handleError');

const index = async (req, res) => {
	const query = req.query
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
	// console.log(req.user);
	// console.log(req.body);
	// console.log(data);
    try {
		const data = {...req.body, userId: parseInt(req.user.id)}
		await Course.create(data);
		res.status(201).json()
	} catch (err) {
		const error = handleError(err)
		console.log(error)
		res.status(error.status).json(error.formatError());
	}
	
}

module.exports = {
	index,
    create,
};
