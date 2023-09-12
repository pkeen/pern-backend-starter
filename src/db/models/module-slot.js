module.exports = (sequelize, DataTypes) => {
	const ModuleSlot = sequelize.define(
		"ModuleSlot",
		{
			order: {
				type: DataTypes.INTEGER,
			},
		},
		{
			tableName: "Module_Slots",
		}
	);

	ModuleSlot.associate = (models) => {
		// Adding the association between ModuleSlot and Course
		ModuleSlot.belongsTo(models.Module, {
			foreignKey: "moduleId", 
			onDelete: "CASCADE",
			allowNull: false,
		});

		ModuleSlot.belongsTo(models.Lesson, {
			foreignKey: "lessonId",
			onDelete: "CASCADE",
		});

        // NOTE: we could have 'subModule' here - I'm not sure what a circular relationship would do...
		// ModuleSlot.belongsTo(models.Module, {
		// 	foreignKey: "moduleId",
		// 	// onUpdate: "CASCADE",
		// 	onDelete: "CASCADE",
		// });
	};

	return ModuleSlot;
};
