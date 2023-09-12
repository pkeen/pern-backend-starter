module.exports = (sequelize, DataTypes) => {
	const CourseSlot = sequelize.define(
		"CourseSlot",
		{
			order: {
				type: DataTypes.INTEGER,
			},
		},
		{
			tableName: "Course_Slots",
		}
	);

	CourseSlot.associate = (models) => {
		// Adding the association between CourseSlot and Course
		CourseSlot.belongsTo(models.Course, {
			foreignKey: "courseId", // Assuming the foreign key in CourseSlot model is courseId
			onDelete: "CASCADE",
			allowNull: false,
		});

		CourseSlot.belongsTo(models.Lesson, {
			foreignKey: "lessonId",
			onDelete: "CASCADE",
		});

		CourseSlot.belongsTo(models.Module, {
			foreignKey: "moduleId",
			// onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});
	};

	return CourseSlot;
};
