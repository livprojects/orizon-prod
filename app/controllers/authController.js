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
			where: {
				username: loweredUsername,
			}
		});

		if (!user) {

			res.send({ logged: false, message:"Aucun.e utilisateur.trice ne répond à ce pseudonyme, désolé !"});

		} else {

			// Checks if password is okay 

			const validPassword = bcrypt.compareSync(password, user.password);

			if (!validPassword) {
				res.send({ logged: false, message: "Mot de passe erroné, désolé."});
			} else {

				const idString = await user.id.toString();

				req.session.user = {
					username: user.username,
					lastname: user.lastname,
					firstname: user.firstname,
					email: user.email,
					id: user.id,
					idString: idString,
					quiz: user.userPLAYEDquiz, 
				};

				res.send({ logged: true, message: `Vous êtes connecté.e ${user.username}, bon voyage !`, username: user.username, lastname: user.lastname, firstname: user.firstname, email: user.email, id: user.id, idString: idString, quiz: user.userPLAYEDquiz });
			}

		}
	},

	logOut: (req, res) => {
		req.session.destroy();
		res.send({ logged : false, message: "Vous avez été déconnecté.e" });
	}, 

	signUp: async(req, res) => {

		let { email, username, password, passwordConfirm, lastname, firstname, birthday } = req.body;

		let loweredUsername = username.toLowerCase();
		let loweredEmail = email.toLowerCase();

		const userMail = await User.findOne({
			where: {
				email: loweredEmail,		
			}
		});

		// Checks if user already exists 

		const userName = await User.findOne({
			where: {
				username: loweredUsername,		
			}
		});

		const emailCheck = MailChecker.isValid(email);


		// Registration process can be improved seperating email and username check

		if (userMail) {
			res.send({ registered: false, 
				message: "Désolé, cet e-mail est déjà utilisé par un compte existant."
			});
		}

		else if (userName) {
			res.send({ registered: false, 
				message: "Désolé, ce nom d'utilisateur existe déjà."
			});
		
		} else if (!emailCheck) {
			res.send({ registered: false, 
				message: "Merci de renseigner une adresse e-mail complète ou de ne pas utiliser une adresse e-mail temporaire."
			});


		} else {

			// Checks password verification 
			// Could be a client-side feature 

			if (password !== passwordConfirm) {
				res.send({ logged: false, message: "Les deux mots de passe ne correspondent pas ou l'un des champs est vide." });

			} else {

				console.log(`loweredUsername: ${loweredUsername}`);
				// Hashing password before putting it in database
				password = bcrypt.hashSync(password, 10);

				// Registers user in database
				
				const registration = await User.create({
					email: loweredEmail, 
					username: loweredUsername, 
					lastname, 
					firstname,
					password,
					birthday
				});


				if (!registration) {
					res.send({ registered: false, message: "L'inscription n'a pas pu se faire, merci de réessayer." });


				} else {

					res.send({ registered: true, message: "Vous êtes bien inscrit.e, vous pouvez à présent vous connecter."});
					// res.redirect("/api/signin");
				}

			}
		}
	},

	isLogged: async(req, res) => {

		if (req.session.user) {

			res.json({ logged: true, username: req.session.user.username, lastname: req.session.user.lastname, firstname: req.session.user.firstname, email: req.session.user.email, id: req.session.user.id, idString: req.session.user.idString, quiz: req.session.user.quiz });
		}
		else {
			res.json({ logged: false });
		}
	},

};

module.exports = authController;