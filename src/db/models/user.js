const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Name is required",
				},
				notEmpty: {
					msg: "Name cannot be empty",
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notNull: {
					msg: "Email is required",
				},
				isEmail: {
					msg: "Must be a valid email address",
				},
				notEmpty: {
					msg: "Email cannot be empty",
				},
			},
			set(value) {
				this.setDataValue("email", value.trim().toLowerCase()); // trim whitespace and make lowercase
			}, // trims whitespace off it lets test this out
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Password is required",
				},
				len: {
					args: [3, 255],
					msg: "Password length should be between 3 and 255 characters",
				},
				notEmpty: {
					msg: "Password cannot be empty",
				},
			},
			// set(value) {
			// 	let hashedPassword;
			// 	bcrypt.hash(value.trim(), SALT_ROUNDS).then(hashed => hashedPassword = hashed);
			// 	this.setDataValue("password", hashedPassword)
			// },
		},
	});

	User.prototype.toJSON = function () {
		const values = { ...this.get() };

		delete values.password; // Remove password from the JSON object

		return values;
	};

	User.associate = (models) => {
		User.hasMany(models.Course, {
			foreignKey: "userId",
			as: "courses",
			onDelete: "CASCADE",
		});
	};

	User.beforeSave(async (user, options) => {
		if (user.changed("password")) {
			const hashedPassword = await bcrypt.hash(
				user.password,
				SALT_ROUNDS
			);
			user.password = hashedPassword;
		}
	});

	return User;
};
