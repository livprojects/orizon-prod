const models = require("../models");
const User = require("../models/user.js");

// UpperCase firstletter of entity to fit with Model case
const getModelFromName = (name) => {
	const entityName = name[0].toUpperCase() + name.slice(1);
	return models[entityName];
};

const crudController = {

	getAll: async(req, res) => {
		const { entity } = req.params;
		const TargetModel = getModelFromName(entity);

		if (!TargetModel) {
			return res.status(404).json({ error: `Model ${entity} not found` });
		}

		const allInstances = await TargetModel.findAll({ include: { all: true } });
		res.json(allInstances);
	},

	getOne: async(req, res) => {
		const { entity, id } = req.params;
		const TargetModel = getModelFromName(entity);

		if (!TargetModel) {
			return res.status(404).json({ error: `Model ${entity} not found` });
		}

		const instance = await TargetModel.findByPk(id, {
			nested: true,
			include: { all: true }
		});

		if (instance) {
			res.json(instance);
		} else {
			res.status(404).json({ error: `Id not found for Model ${entity}` });
		}
	},

	createOne: async(req, res) => {
		// Configured to check creation of : user
		// If need more, don't forget to add requiredField for each added model
		const { entity } = req.params;
		const TargetModel = getModelFromName(entity);

		if (!TargetModel) {
			return res.status(404).json({ error: `Model ${entity} not found` });
		}

		// Checking requiredFields
		console.debug(req.body);
		if (TargetModel.requiredFields) {
			for (const field of TargetModel.requiredFields) {
				if (!req.body[field]) {
					return res.status(400).json({ error: `${field} is missing` });
				}
			}
		}

		const addedElement = await TargetModel.create(req.body);
		res.json(addedElement);
	},

	updateOne: async(req, res) => {
		const { entity, id } = req.params;
		const TargetModel = getModelFromName(entity);

		if (!TargetModel) {
			return res.status(404).json({ error: `Model ${entity} not found` });
		}

		const eltToUpdate = await TargetModel.findByPk(id, {
			// Add nested:true if quiz
			include: { all: true }
		});

		if (!eltToUpdate) {
			return res.status(404).json({ error: `Item ${id} not found` });
		}

		if (entity === "user") {
			console.debug(req.body);
			const user = await User.findByPk(id, {
				// Add nested:true if quiz
				include: { all: true }
			});

			const checkEmail = await User.findOne({ where: { email: req.body.email } });
			const checkUsername = await User.findOne({ where: { username: req.body.username } });

			if (checkEmail && req.body.email !== user.email) {
				return res.json({ message: "Cet email est déjà utilisé, veuillez en saisir un autre." });
			}

			if (checkUsername && req.body.username !== user.username) {
				return res.json({ message: "Ce pseudo est déjà utilisé, veuillez en saisir un autre" });
			}

			user.username = req.body.username;
			user.lastname = req.body.lastname;
			user.firstname = req.body.firstname;
			user.email = req.body.email;
			await user.save();

			req.session.user = {
				username: user.username,
				lastname: user.lastname,
				firstname: user.firstname,
				email: user.email,
				id: user.id,
				idString: user.id.toString(),
				quiz: user.userPLAYEDquiz,
			};

			res.json({ newDatas: user, message: "Le profil a été mis à jour." });

		} else {
			const eltUserSaved = await eltToUpdate.save();
			res.json(eltUserSaved);
		}
	},

	deleteOne: async(req, res) => {
		const { entity, id } = req.params;
		const TargetModel = getModelFromName(entity);

		if (!TargetModel) {
			return res.status(404).json({ error: `Model ${entity} not found` });
		}

		const eltToDelete = await TargetModel.findByPk(id);

		if (eltToDelete) {
			await eltToDelete.destroy();
			res.json({ message: `${entity} ${id} deleted` });
		} else {
			res.status(404).json({ error: `${id} not found` });
		}
	}
};

module.exports = crudController;
