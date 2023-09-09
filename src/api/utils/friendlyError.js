/**
 * Represents a friendly error with extended properties.
 */
class FriendlyError extends Error {
	/**
	 * @param {string} message - The error message.
	 * @param {number} status - The HTTP status code.
	 * @param {string} errCode - The error code.
	 */
	constructor(
		message = "We're afraid an unkown error has occurred",
		status = 500,
		errCode = "unknown_error"
	) {
		super(message);
		this.status = status;
		this.errCode = errCode;
	}

	/**
	 * Gets the error object with structured format.
	 * @returns {object} The error object.
	 */
	formatError() {
		return {
			error: {
				code: this.errCode,
				message: this.message,
			},
		};
	}
}

module.exports = FriendlyError;
