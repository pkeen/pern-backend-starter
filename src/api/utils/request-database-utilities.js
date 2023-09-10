const FriendlyError = require('./friendlyError');

const getObjectOr404 = async (id, model) => {
	let obj;
	try {
		obj = await model.findByPk(id);
	} catch (err) {
		throw new FriendlyError(
			"An unexpected error occurred",
			500,
			"unexpected_error"
		);
	}
	if (!obj) {
		throw new FriendlyError(
			`${model.name} not found - cannot delete`,
			404,
			`${model.name}_not_found`
		);
	}
	return obj;
};

const userIsOwnerOr403 = (user, obj) => {
	if (user.id !== obj.userId) {
		throw new FriendlyError(
			"User is not the owner of this resource",
			403,
			"not_owner"
		);
	}
};

module.exports = {
    getObjectOr404,
    userIsOwnerOr403,
}
