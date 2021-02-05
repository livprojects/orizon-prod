const Sequelize = require("sequelize");
const sequelize = require("../database");

class Quiz extends Sequelize.Model {

}

Quiz.init({
	title: Sequelize.STRING,
	description: Sequelize.TEXT,
	nbr_of_questions: Sequelize.INTEGER,
}, {
	sequelize,
	tableName: "quiz"
});


module.exports = Quiz;
