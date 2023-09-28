const { Lesson } = require("../../db/models/index");
const { getObjectOr404 } = require("../utils/request-database-utilities");
const { handleError } = require("../utils/handleError");

const getOne = async (req, res) => {
	try {
		const id = req.params.id;
		console.log("getting here");
		const lesson = await getObjectOr404(id, Lesson);
		res.status(200).json(lesson);
	} catch (err) {
		const error = handleError(err);
		res.status(error.status).json(error.formatError());
	}
};

module.exports = {
	getOne,
};
