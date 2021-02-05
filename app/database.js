// Sequelize
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL,{
	define: {
		timestamps: false
	},
});

module.exports = sequelize;