// Express
const express = require("express");
const router = express.Router();
const path = require('path');

// Middleware to avoid try/catch in controllers
const capture = require("./middlewares/captureMiddleware");
const userMiddleware = require("./middlewares/userMiddleware");
const adminMiddleware = require("./middlewares/adminMiddleware");

// controllers import
const crudController = require("./controllers/crudController");
const handleQuizController = require("./controllers/handleQuizController");
const newsController = require("./controllers/newsController");
const authController = require("./controllers/authController");
const uploadController = require("./controllers/uploadController");

// crud — reads are public, writes are admin-only
router.get("/api/crud/:entity", capture(crudController.getAll));
router.get("/api/crud/:entity/:id", capture(crudController.getOne));
router.post("/api/crud/:entity", adminMiddleware, capture(crudController.createOne));
router.patch("/api/crud/:entity/:id", adminMiddleware, capture(crudController.updateOne));
router.delete("/api/crud/:entity/:id", adminMiddleware, capture(crudController.deleteOne));

// signin and out
router.post("/api/signin", capture(authController.logIn));
router.post("/api/logout", capture(authController.logOut));
router.post("/api/signup", capture(authController.signUp));
router.get("/api/isLogged", capture(authController.isLogged));

// Upload avatar — must be logged in
router.post("/api/upload/:idString", userMiddleware, uploadController.avatar);

// handlequiz — reads are public, saving scores requires login
router.get("/api/handlequiz/:quizid", capture(handleQuizController.getOneQuiz));
router.get("/api/handlequiz/", capture(handleQuizController.getAllQuizzes));
router.get("/api/handlequiz/users/:userid", userMiddleware, capture(handleQuizController.getScoresForOneUser));
router.post("/api/handlequiz/save/:userid", userMiddleware, capture(handleQuizController.saveScoreinDatabase));

// news
router.get("/api/news/:indexNews", capture(newsController.getAllNews));
router.get("/api/news/:source/:indexNews", capture(newsController.getBySource));

router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Export
module.exports = router;