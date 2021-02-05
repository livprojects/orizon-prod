const Sequelize = require("sequelize");
const sequelize = require("../database");

class Proposition extends Sequelize.Model {

}

Proposition.init({
	description: Sequelize.STRING,
}, {
	sequelize,
	tableName: "proposition"
});


module.exports = Proposition;
