const Sequelize = require("sequelize");
const sequelize = require("../database");

class Institution extends Sequelize.Model {

}

Institution.init({
	name: Sequelize.STRING
}, {
	sequelize,
	tableName: "institution"
});


module.exports = Institution;
