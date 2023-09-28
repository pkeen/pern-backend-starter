const { Order, Course, User } = require("../../db/models/index");
const handleError = require("../utils/handleError");

const getCoursesPurchasedByUser = async (req, res) => {
	try {
		console.log("getting to right controller");

		const userId = parseInt(req.params.id);

		const orders = await Order.findAll({
			where: { userId: userId },
			include: [
				{
					model: Course,
					include: [
						{
							model: User,
							attributes: ["id", "name"],
						},
					],
				},
			],
		});

		console.log(orders);

		res.status(200).json(orders);
	} catch (err) {
		if (err instanceof FriendlyError) {
			res.status(err.status).json(err.formatError());
		} else {
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

const getUserOrders = async (req, res) => {
	try {
		console.log("getting to right controller");

		const userId = parseInt(req.params.id);

		const orders = await Order.findAll({
			where: { userId: userId },
		});

		console.log(orders);

		res.status(200).json(orders);
	} catch (err) {
		if (err instanceof FriendlyError) {
			res.status(err.status).json(err.formatError());
		} else {
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

const create = async (req, res) => {
	try {
        console.log(req.body);
		// const data = { ...req.body, userId: parseInt(req.user.id) };
		// const order = await Order.create(data);
		// res.status(201).json(order);
	} catch (err) {
		console.log("sequelize error: ", err);
		const error = handleError(err);
		console.log(error);
		res.status(error.status).json(error.formatError());
	}
};

module.exports = {
	getCoursesPurchasedByUser,
	getUserOrders,
	create,
};
