const FriendlyError = require('../../api/utils/friendlyError');

module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define("Order", {
		orderDate: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
            // TODO: at the moment not getting this set in my seed file
		},
		total: {
			type: DataTypes.DECIMAL,
		},
	});

	Order.associate = (models) => {
		// Adding the association between Order and Course
		Order.belongsTo(models.Course, {
			foreignKey: "courseId", // Assuming the foreign key in Order model is courseId
			onDelete: "SET NULL", // probably want to keep an order for records
			allowNull: false,
		});

		Order.belongsTo(models.User, {
			foreignKey: "userId",
			onDelete: "SET NULL", // keep order for records
		});
	};

	Order.isAlreadyOrdered = async function (userId, courseId) {
		// Find an order with the provided userId and courseId
		const order = await this.findOne({
			where: {
				userId,
				courseId,
			},
		});

		return !!order; // return true if an order is found, otherwise false
	};

	Order.beforeCreate(async (order, options) => {
		// Check if the user has already ordered this course
		const isAlreadyOrdered = await Order.isAlreadyOrdered(
			order.userId,
			order.courseId
		);

		if (isAlreadyOrdered) {
			throw new FriendlyError("User has already ordered this course", 400, "already_ordered");
		}
	});

	return Order;
};
