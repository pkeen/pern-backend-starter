module.exports = (sequelize, DataTypes) => {
	const Course = sequelize.define("Course", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			// unique: true,
		},
		description: {
			type: DataTypes.TEXT,
		},
		isPublished: {
			type: DataTypes.BOOLEAN,
		},
		isCurated: {
			type: DataTypes.BOOLEAN,
		},
		price: {
			type: DataTypes.DECIMAL,
			validate: {
				min: 0,
			},
		},
	});

	Course.associate = (models) => {
		Course.belongsTo(models.User, {
			foreignKey: "userId",
			onDelete: "CASCADE",
			allowNull: false,
		});

		Course.hasMany(models.CourseSlot, {
			foreignKey: "courseId",
			onDelete: "CASCADE",
		});
	};

	return Course;
};
