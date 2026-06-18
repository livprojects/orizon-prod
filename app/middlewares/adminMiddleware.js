const adminMiddleware = (req, res, next) => {
	if (!req.session.user) {
		return res.status(401).json({ error: "Unauthorized: you must be logged in." });
	}
	if (req.session.user.role !== "admin") {
		return res.status(403).json({ error: "Forbidden: admin access required." });
	}
	next();
};

module.exports = adminMiddleware;
