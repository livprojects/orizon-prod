const userMiddleware = (req, res, next) => {
	if (!req.session.user) {
		return res.status(401).json({ error: "Unauthorized: you must be logged in." });
	}
	next();
};

module.exports = userMiddleware;
