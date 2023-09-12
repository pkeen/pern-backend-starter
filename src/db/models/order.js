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

	return Order;
};
