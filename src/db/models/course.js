module.exports = (sequelize, DataTypes) => {
	const Course = sequelize.define("Course", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			// unique: true,
		},
	});

    Course.associate = (models) => {
		Course.belongsTo(models.User, {
			foreignKey: "userId",
			as: "author",
		});
	};

	return Course;
};
