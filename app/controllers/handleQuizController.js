/* eslint-disable no-undef */
  
const {
	Quiz,
	User
} = require("../models");

const handleQuizController = {


	// Request to get the full quiz (questions and answers propositions) with one GET request 

	getOneQuiz: async (req, res) => {
		// Id and entity retrieved from GET request on the client-side 
		const {
			quizid
		} = req.params;

		// Retrieves the right quiz with its primary key (id here)
		const oneQuiz = await Quiz.findByPk(quizid, {

			// Also includes the answers list with each question 
			include: [{
				association: "questions",
				include: ["propositions", "questionsCONFIRMSpropositions"]
			}]

		});

		if (oneQuiz) {
			res.json(oneQuiz);
		} else {

			// if the id doesn't exist, it sends this error back //
			res.status(404).json({
				error: "Couldn't find the quiz you were looking for with this specific id"
			});
		}

	},

	// Request to get all quizzes

	getAllQuizzes: async (req, res) => {
		const allQuizzes = await Quiz.findAll({
			include: [{
				association: "questions",
				include: ["propositions", "questionsCONFIRMSpropositions"]
			}]
		}
		);

		if (!allQuizzes) {
			res.status(404).json({
				error: "Couldn't find the quiz you were looking for with this specific id"
			});
		} else {
			// allQuizzes is an array of objects 
			res.json(allQuizzes);
		}

	},

	// Request to get all quizzes taken by one user (with scores, first name, quiz id, quiz title, quiz description)

	getScoresForOneUser: async (req, res) => {
		// But : récupérer TOUS les quiz WHERE "quizPLAYEDBYuser" (boucle).id_user = quelque chose 

		const {
			userid
		} = req.params;

		console.log(`userid: ${userid}`);

		// userQuizzes is one object, with a key userPLAYEDquiz containing an array of objects (quizzes taken)
		const userQuizzes = await User.findByPk((userid), {
			include: "userPLAYEDquiz"
		});

		if (!userQuizzes) {
			res.status(404).json({
				error: "Couldn't find the quiz you were looking for with this specific id"
			});
		} else {

			// Sends back an array of objects, one object being one quiz taken by the user
			res.json(userQuizzes.userPLAYEDquiz);
		}

	},

	saveScoreinDatabase: async (req, res) => {


		const { id, score, quizid } = req.body;
	
		const user = await User.findByPk(id);
		const quiz = await Quiz.findByPk(quizid);
	
		if (user && quiz) {

			//looking for relation in db
			const scoreExist = await Score.findOne({
				where: {
					id_user: user.id,
					id_quiz: quiz.id,
				}
			});
			
			// if does exist update, else create
			if(scoreExist) {
				console.log('le score existe deja')
				scoreExist.id_user = id,
				scoreExist.id_quiz = quizid,
				scoreExist.score = score,
				await scoreExist.save();
			} else {
				console.log('le score n existe pas encore')
				await Score.create({
					id_user: id,
					id_quiz: quizid,
					score: score,
				});
			}

			const userAfterUpdate = await User.findByPk(id, {
				// Add nested:true if quiz
				include: {all:true}
			});

			const idString = await userAfterUpdate.id.toString();
			console.log(userAfterUpdate.userPLAYEDquiz)
			req.session.user = {
				username: userAfterUpdate.username,
				lastname: userAfterUpdate.lastname,
				firstname: userAfterUpdate.firstname,
				email: userAfterUpdate.email,
				id: userAfterUpdate.id,
				idString: idString,
				quiz: userAfterUpdate.userPLAYEDquiz, 
			};

			res.json({message: 'Score enregistré !', quiz: userAfterUpdate.userPLAYEDquiz})
	 
		} else {
	
			res.status(404).json({
				error: "Couldn't find a user with this id"
			});
		}
	}

};

module.exports = handleQuizController;