const FriendlyError = require("./friendlyError");
// const formatError = (message, statusCode) => {
// 	return {
// 		error: {
// 			message: message,
// 		},
// 	};
// };

const handleError = (err) => {
	// return FriendlyError for known occurances
	switch (err.name) {
		case "SequelizeForeignKeyConstraintError":
			return new FriendlyError(
				"Related table entry not found",
				403,
				"foreignKey_constraint"
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
