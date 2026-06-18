const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const MailChecker = require("mailchecker");

const authController = {

	logIn: async(req, res) => {

		const { username, password } = req.body;
		const loweredUsername = username.toLowerCase();
		// Checks if user exists in database

		const user = await User.findOne({
			include: "userPLAYEDquiz",
			where: { username: loweredUsername }
		});

		if (!user) {
			return res.json({ logged: false, message: "Aucun.e utilisateur.trice ne répond à ce pseudonyme, désolé !" });
		}

		// Checks if password is okay
		const validPassword = bcrypt.compareSync(password, user.password);

		if (!validPassword) {
			return res.json({ logged: false, message: "Mot de passe erroné, désolé." });
		}

		const idString = user.id.toString();

		req.session.user = {
			username: user.username,
			lastname: user.lastname,
			firstname: user.firstname,
			email: user.email,
			id: user.id,
			idString,
			quiz: user.userPLAYEDquiz,
		};

		res.json({
			logged: true,
			message: `Vous êtes connecté.e ${user.username}, bon voyage !`,
			username: user.username,
			lastname: user.lastname,
			firstname: user.firstname,
			email: user.email,
			id: user.id,
			idString,
			quiz: user.userPLAYEDquiz,
		});
	},

	logOut: (req, res) => {
		req.session.destroy();
		res.json({ logged: false, message: "Vous avez été déconnecté.e" });
	},

	signUp: async(req, res) => {

		let { email, username, password, passwordConfirm, lastname, firstname, birthday } = req.body;

		const loweredUsername = username.toLowerCase();
		const loweredEmail = email.toLowerCase();

		const userMail = await User.findOne({ where: { email: loweredEmail } });

		// Checks if user already exists
		const userName = await User.findOne({ where: { username: loweredUsername } });

		const emailCheck = MailChecker.isValid(email);

		// Registration process can be improved separating email and username check

		if (userMail) {
			return res.json({ registered: false, message: "Désolé, cet e-mail est déjà utilisé par un compte existant." });
		}

		if (userName) {
			return res.json({ registered: false, message: "Désolé, ce nom d'utilisateur existe déjà." });
		}

		if (!emailCheck) {
			return res.json({ registered: false, message: "Merci de renseigner une adresse e-mail complète ou de ne pas utiliser une adresse e-mail temporaire." });
		}

		// Checks password verification
		// Could be a client-side feature
		if (password !== passwordConfirm) {
			return res.json({ registered: false, message: "Les deux mots de passe ne correspondent pas ou l'un des champs est vide." });
		}

		// Hashing password before putting it in database
		console.debug(`loweredUsername: ${loweredUsername}`);
		const hashedPassword = bcrypt.hashSync(password, 10);

		// Registers user in database
		const registration = await User.create({
			email: loweredEmail,
			username: loweredUsername,
			lastname,
			firstname,
			password: hashedPassword,
			birthday,
		});

		if (!registration) {
			return res.json({ registered: false, message: "L'inscription n'a pas pu se faire, merci de réessayer." });
		}

		res.json({ registered: true, message: "Vous êtes bien inscrit.e, vous pouvez à présent vous connecter." });
	},

	isLogged: (req, res) => {
		if (req.session.user) {
			const { username, lastname, firstname, email, id, idString, quiz } = req.session.user;
			res.json({ logged: true, username, lastname, firstname, email, id, idString, quiz });
		} else {
			res.json({ logged: false });
		}
	},
};

module.exports = authController;
