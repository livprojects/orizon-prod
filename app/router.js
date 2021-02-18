/* eslint-disable no-undef */
// Express
const express = require("express");
const router = express.Router();

// Middleware to avoid try/catch in controllers
const capture = require("./middlewares/captureMiddleware");

// controllers import
const crudController = require("./controllers/crudController");
const handleQuizController = require("./controllers/handleQuizController");
const newsController = require("./controllers/newsController");
const authController = require("./controllers/authController");
const uploadController = require("./controllers/uploadController");

// crud
router.get("/api/crud/:entity", capture(crudController.getAll));
router.get("/api/crud/:entity/:id", capture(crudController.getOne));
router.post("/api/crud/:entity", capture(crudController.createOne));
router.patch("/api/crud/:entity/:id", capture(crudController.updateOne));
router.delete("/api/crud/:entity/:id", capture(crudController.deleteOne));

// signin and out
router.post("/api/signin", capture(authController.logIn));
router.post("/api/logout", capture(authController.logOut));
router.post("/api/signup", capture(authController.signUp));
router.get("/api/isLogged", capture(authController.isLogged));

// Upload avatar
router.post("/api/upload/:idString", uploadController.avatar);

// handlequiz
router.get("/api/handlequiz/:quizid", capture(handleQuizController.getOneQuiz));
router.get("/api/handlequiz/", capture(handleQuizController.getAllQuizzes));
router.get("/api/handlequiz/users/:userid", capture(handleQuizController.getScoresForOneUser));
router.post("/api/handlequiz/save/:userid", capture(handleQuizController.saveScoreinDatabase));

// news
router.get("/api/news/:indexNews", capture(newsController.getAllNews));
router.get("/api/news/:source/:indexNews", capture(newsController.getBySource));

router.use(function(req, res) {
	res.sendFile(path.join(__dirname, './build/index.html'));
});

// Export
module.exports = router;