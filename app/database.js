// Sequelize
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL,{
	ssl: true,
        dialectOptions: {
            ssl: true
    },
	define: {
		timestamps: false
	},
});

module.exports = sequelize;