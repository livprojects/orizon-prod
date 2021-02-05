const Sequelize = require("sequelize");
const sequelize = require("../database");

const Institution = require("./institution");
const Mission = require("./mission");
const Planet = require("./planet");
const User = require("./user");
const Quiz = require("./quiz");
const Question = require("./question");
const Proposition = require("./proposition");

// ----------------------
// INSTITUTION - MISSION
// ----------------------
Institution.belongsToMany(Mission, {
	through: "institution_launches_mission",
	foreignKey: "id_institution",
	otherKey: "id_mission",
	as: "missionsBTinstitutions"
});

Mission.belongsToMany(Institution, {
	through: "institution_launches_mission",
	foreignKey: "id_mission",
	otherKey: "id_institution",
	as: "institutions"
});

// ----------------------
// PLANET - MISSION
// ----------------------
Planet.belongsToMany(Mission, {
	through: "planet_welcomes_mission",
	foreignKey: "id_planet",
	otherKey: "id_mission",
	as: "missions"
});

Mission.belongsToMany(Planet, {
	through: "planet_welcomes_mission",
	foreignKey: "id_mission",
	otherKey: "id_planet",
	as: "planets"
});

// ----------------------
// USER - MISSION
// ----------------------
User.belongsToMany(Mission, {
	through: "user_likes_mission",
	foreignKey: "id_user",
	otherKey: "id_mission",
	as: "missionsLIKEDBYuser"
});

Mission.belongsToMany(User, {
	through: "user_likes_mission",
	foreignKey: "id_mission",
	otherKey: "id_user",
	as: "userLIKEmissions"
});

// ----------------------
// QUIZ - QUESTION
// ----------------------
Quiz.belongsToMany(Question, {
	through: "quiz_handles_question",
	foreignKey: "id_quiz",
	otherKey: "id_question",
	as: "questions"
});

Question.belongsToMany(Quiz, {
	through: "quiz_handles_question",
	foreignKey: "id_question",
	otherKey: "id_quiz",
	as: "questionsBTquiz"
});

// ------------------------------
// USER - QUIZ ("user plays quiz")
// ------------------------------

// add score column to the relation
Score = sequelize.define("user_plays_quiz", {
	score: Sequelize.INTEGER
}, 
{
// Avoid Sequelize to auto add "s" at the end of table
	freezeTableName: true,
	tableName: "user_plays_quiz",
});

User.belongsToMany(Quiz, {
	through: Score,
	foreignKey: "id_user",
	otherKey: "id_quiz",
	as: "userPLAYEDquiz",
});

Quiz.belongsToMany(User, {
	through: Score,
	foreignKey: "id_quiz",
	otherKey: "id_user",
	as: "quizPLAYEDBYuser"
});

// ----------------------
// QUESTION (has) PROPOSITION
// ----------------------
Question.belongsToMany(Proposition, {
	through: "question_has_proposition",
	foreignKey: "id_question",
	otherKey: "id_proposition",
	as: "propositions"
});

Proposition.belongsToMany(Question, {
	through: "question_has_proposition",
	foreignKey: "id_proposition",
	otherKey: "id_question",
	as: "propositionsBTquestions"
});

// ----------------------
// PROPOSITION (confirms) QUESTION
// ----------------------
Question.belongsToMany(Proposition, {
	through: "proposition_confirms_question",
	foreignKey: "id_question",
	otherKey: "id_proposition",
	as: "questionsCONFIRMSpropositions"
});

Proposition.belongsToMany(Question, {
	through: "proposition_confirms_question",
	foreignKey: "id_proposition",
	otherKey: "id_question",
	as: "propositionsCONFIRMSquestions"
});

module.exports = { Institution, Mission, Planet, User, Quiz, Question, Proposition};
