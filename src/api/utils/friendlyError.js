/**
 * Represents a friendly error with extended properties.
 */
class FriendlyError extends Error {
	/**
	 * @param {string} message - The error message.
	 * @param {string} errCode - The error code.
	 * @param {number} statusCode - The HTTP status code.
	 */
	constructor(message, errCode, statusCode) {
		super(message);
		this.errCode = errCode;
		this.statusCode = statusCode;
	}

	/**
	 * Gets the error object with structured format.
	 * @returns {object} The error object.
	 */
	getErrorObj() {
		return {
			error: {
				code: this.errCode,
				message: this.message,
			},
		};
	}
}

module.exports = FriendlyError