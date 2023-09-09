const { User, Course } = require("../../db/models/index");

const index = async (req, res) => {
    console.log(req.params);
	console.log(req.query)
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
    
}

module.exports = {
	index,
    create,
};
