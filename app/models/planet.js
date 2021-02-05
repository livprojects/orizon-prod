const Sequelize = require("sequelize");
const sequelize = require("../database");

class Planet extends Sequelize.Model {

}

Planet.init({
	name: Sequelize.STRING,
	description: Sequelize.TEXT,
	position: Sequelize.INTEGER,
	is_planet: Sequelize.BOOLEAN,
	surface: Sequelize.DECIMAL,
	mass: Sequelize.DECIMAL,
	volume: Sequelize.DECIMAL,
	gravity: Sequelize.DECIMAL,
	temp_max: Sequelize.DECIMAL,
	temp_average: Sequelize.DECIMAL,
	temp_min: Sequelize.DECIMAL,
	sidereal_orbit: Sequelize.DECIMAL,
	sidereal_rotation: Sequelize.DECIMAL,
	rotation_speed: Sequelize.DECIMAL,
	discovered_by: Sequelize.STRING,
	discovery_date: Sequelize.DATE,
	geopolitics_info: Sequelize.TEXT,
	pollution_info: Sequelize.TEXT,
	picture_link: Sequelize.TEXT,
}, {
	sequelize,
	tableName: "planet"
});


module.exports = Planet;
