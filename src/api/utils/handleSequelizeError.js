// class FriendlyError extends Error {
// 	constructor(message, errCode, statusCode) {
// 		super(message);
// 		this.errCode = errCode;
// 		this.statusCode = statusCode;
// 	}

// 	getErrorObj () {
// 		return {
// 			error: {
// 				code: this.errCode,
// 				message: this.message
// 			},
// 		};
// 	}
// }

function handleSequelizeError(err) {
	if (err.name === "SequelizeValidationError") {
		const errors = err.errors.map((error) => ({
			type: error.type,
			path: error.path,
			message: formatErrorMessage(error),
		}));
		return { statusCode: 403, errors };
	}
	if (err.name === "SequelizeUniqueConstraintError") {
		const errors = err.errors.map((error) => ({
			type: error.type,
			path: error.path,
			message: `Sign Up Failed: ${error.path} is already in use.`,
		}));
		return { statusCode: 409, errors };
	}
	// ... handle other types of Sequelize errors
	return {
		statusCode: 500,
		errors: [{ message: "An unexpected error occurred." }],
	};
}

function formatErrorMessage(error) {
	switch (error.validatorKey) {
		case "len":
			return `The ${error.path} field must be between ${error.validatorArgs[0]} and ${error.validatorArgs[1]} characters.`;
		case "isEmail":
			return `The ${error.path} field must be a valid email address.`;
		case "notEmpty":
			return `The ${error.path} field cannot be empty.`;
		case "notNull":
			return `The ${error.path} field is required.`;
		// ... add cases for other validators you're using
		default:
			return error.message;
	}
}

module.exports = { handleSequelizeError };
