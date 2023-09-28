const { Module } = require("../../db/models/index");
const { getObjectOr404 } = require("../utils/request-database-utilities");
const handleError = require("../utils/handleError");

const getOne = async (req, res) => {
	try {
		const id = req.params.id;
		const module = await getObjectOr404(id, Module);
		res.status(200).json(module);
	} catch (err) {
		const error = handleError(err);
		res.status(error.status).json(error.formatError());
	}
};

module.exports = {
	getOne,
};
