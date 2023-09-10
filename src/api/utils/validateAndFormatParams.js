
const validateAndFormatParams = (model, params) => {
	const formattedParams = {};

	Object.keys(params).forEach((key) => {
		const attributeType = model.rawAttributes[key].type;
        console.log(attributeType);

		if (attributeType) {
			switch (attributeType.key) {
				case "INTEGER":
					formattedParams[key] = parseInt(params[key], 10);
					break;
				// Add cases for other data types as necessary
				default:
					formattedParams[key] = params[key];
			}
		}
	});

	return formattedParams;
};

module.exports = validateAndFormatParams;
