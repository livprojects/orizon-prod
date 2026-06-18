const capture = (baseFunc) => {
	return async (req, res, next) => {
		try {
			await baseFunc(req, res, next);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal server error" });
		}
	};
};

module.exports = capture;