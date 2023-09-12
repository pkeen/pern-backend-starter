module.exports = (sequelize, DataTypes) => {
	const Lesson = sequelize.define("Lesson", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		text: {
			type: DataTypes.TEXT,
		},
		videoLink: {
			type: DataTypes.STRING,
		},
		isPublished: {
			type: DataTypes.BOOLEAN,
		},
		isFree: {
			type: DataTypes.BOOLEAN,
		},
	});

	Lesson.associate = (models) => {
		Lesson.hasMany(models.CourseSlot, {
			foreignKey: "lessonId",
			onDelete: "CASCADE",
		});

		Lesson.belongsTo(models.User, {
			foreignKey: "userId",
			onDelete: "CASCADE",
		});
	};

	return Lesson;
};
