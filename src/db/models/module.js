module.exports = (sequelize, DataTypes) => {
	const Module = sequelize.define("Module", {
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
	});

	Module.associate = (models) => {
		Module.hasMany(models.CourseSlot, {
			foreignKey: "moduleId",
			// onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});
	};

	return Module;
};
