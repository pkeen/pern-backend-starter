const FriendlyError = require("./friendlyError");
// const formatError = (message, statusCode) => {
// 	return {
// 		error: {
// 			message: message,
// 		},
// 	};
// };

const formatValidationError = (err) => {
	switch (err.validatorKey) {
		case "len":
			return `The ${err.path} field must be between ${err.validatorArgs[0]} and ${err.validatorArgs[1]} characters.`;
		case "isEmail":
			return `The ${err.path} field must be a valid email address.`;
		case "notEmpty":
			return `The ${err.path} field cannot be empty.`;
		case "notNull":
			return `The ${err.path} field is required.`;
		// ... add cases for other validators you're using
		default:
			return "The form contains an invalid entry";
	}
};

const handleError = (err) => {
	// return FriendlyError for known occurances
	switch (err.name) {
		case "FriendlyError":
			return err;

		case "SequelizeForeignKeyConstraintError":
			return new FriendlyError(
				"Related table entry not found",
				403,
				"foreignKey_constraint"
			);
		case "SequelizeUniqueConstraintError":
			// console.log(err);
			return new FriendlyError(
				`Sign Up Failed: ${err.errors[0].path} is already in use.`,
				409,
				"field_not_unique_error"
			);
		case "SequelizeValidationError":
			return new FriendlyError(
				formatValidationError(err.errors[0]),
				403,
				"validation_error"
			);

		default:
			return new FriendlyError(
				"We're afraid an unknown error has occurred"
			);
	}
};

// const handleError = (err) => {
//     const error = decodeError(err);
// }

module.exports = handleError;
