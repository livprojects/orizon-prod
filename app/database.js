// Sequelize
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL,{
	dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
	define: {
		timestamps: false
	},
});

module.exports = sequelize;