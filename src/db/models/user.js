module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	User.associate = (models) => {
		User.hasMany(models.Course, {
			foreignKey: "userId",
			as: "courses",
		});
	};

	return User;
};
