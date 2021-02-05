const Sequelize = require("sequelize");
const sequelize = require("../database");

class Question extends Sequelize.Model {

}

Question.init({
	title: Sequelize.TEXT,
	wiki: Sequelize.TEXT,
}, {
	sequelize,
	tableName: "question"
});


module.exports = Question;
