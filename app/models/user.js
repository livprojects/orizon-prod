const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {
  // Required Fields ton avoid error in 'crudController > createOne'
  // static requiredFields = ['username', 'lastname', 'firstname', 'email', 'password', 'birthday', 'role'];

};

User.init({
  username: Sequelize.STRING,
  lastname: Sequelize.STRING,
  firstname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  birthday: Sequelize.DATE,
  role: Sequelize.STRING,
}, {
  sequelize,
  tableName: "user"
});


module.exports = User;
