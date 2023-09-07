module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
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
			onDelete: 'CASCADE'
		});
	};

	return User;
};
