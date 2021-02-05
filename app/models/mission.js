const Sequelize = require("sequelize");
const sequelize = require("../database");

class Mission extends Sequelize.Model {

}

Mission.init({
	mission_name: Sequelize.STRING,
	program_name: Sequelize.STRING,
	launch_date: Sequelize.DATE,
	planet_geoloc: Sequelize.STRING,
	mission_goal: Sequelize.TEXT,
	human_mission: Sequelize.BOOLEAN,
	mission_type: Sequelize.STRING,
	return_flight: Sequelize.BOOLEAN,
	picture_link: Sequelize.STRING
}, {
	sequelize,
	tableName: "mission"
});


module.exports = Mission;
