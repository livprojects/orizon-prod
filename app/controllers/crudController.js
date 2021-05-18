const models = require("../models");
const User = require("../models/user.js");

// UpperCase firstletter of entity to fit with Model case
const getModelFromName = (name) => {
	const entityName = name[0].toUpperCase() + name.slice(1);
	return models[entityName];
};

const crudController = {

	getAll: async(req, res) => {
		const entity = req.params.entity;
		const TargetModel = getModelFromName(entity);

		if(!TargetModel) {
			res.status(404).json({error: `Model ${entity} not found`});
		} else {
			const allInstances = await TargetModel.findAll({
				include: {all:true}
			});

			res.json(allInstances);
		}
	},

	getOne: async(req, res) => {
		const {entity, id} = req.params;
		const TargetModel = getModelFromName(entity);

		if(!TargetModel) {
			res.status(404).json({error: `Model ${entity} not found`});
		} else {
			const instance = await TargetModel.findByPk(id, {
				nested: true,
				include: {all:true}
			});

			if(instance) {
				res.json(instance);
			} else {
				res.status(404).json({error: `Id not found for Model ${entity}`});
			}
		}
	},

	createOne: async(req, res) => {
		// Configured to check creation of : user
		// If need more, don't forget to add requiredField for each added model
		const entity = req.params.entity;
		const TargetModel = getModelFromName(entity);

		if(!TargetModel) {
			res.status(404).json({error: `Model ${entity} not found`});
		} else {
			// Checking requiredFields 
			console.log(req.body);
			for (field of TargetModel.requiredFields) {
				if (!req.body[field]) {
					throw new Error(field + " is missing");
				}
			}
			const addedElement = await TargetModel.create(req.body);
			res.json(addedElement);
		}
	},

	updateOne: async(req, res) => {
		const entity = req.params.entity;
		const TargetModel = getModelFromName(entity);

		if(!TargetModel) {
			res.status(404).json({error: `Model ${entity} not found`});
		} else {
			const id = req.params.id;
			const eltToUpdate = await TargetModel.findByPk(id, {
				// Add nested:true if quiz
				include: {all:true}
			});

			if(eltToUpdate) {

				// const objet = Object.assign(eltToUpdate, req.body);

				if(entity == 'user') {
					console.log(req.body)
					const user = await User.findByPk(id, {
						// Add nested:true if quiz
						include: {all:true}
					});

					const idString = await user.id.toString();

						const checkEmail = await User.findOne({
							where: { email: req.body.email }
						});

						const checkUsername = await User.findOne({
							where: { username: req.body.username  }
						});

						if((checkEmail) && (req.body.email != user.email)) {
							req.session.user = {
								username: user.username,
								lastname: user.lastname,
								firstname: user.firstname,
								email: user.email,
								id: user.id,
								idString: idString,
								quiz: checkEmail.userPLAYEDquiz,
							};

							res.json({ message: "Cet email est déjà utilisé, veuillez en saisir un autre."});
						}
											
						
						if ((checkUsername) && (req.body.username != user.username)) {

									

							req.session.user = {
								username: req.body.username,
								lastname: req.body.lastname,
								firstname: req.body.firstname,
								email: req.body.email,
								id: req.body.id,
								idString: idString,
								quiz: checkUsername.userPLAYEDquiz,
							};

							res.json({ message:"Ce pseudo est déjà utilisé, veuillez en saisir un autre"});
						}

						else {

							const user = await User.findByPk(id, {
								// Add nested:true if quiz
								include: {all:true}
							});

							user.username = req.body.username,
							user.lastname = req.body.lastname,
							user.firstname = req.body.firstname,
							user.email = req.body.email,

							await user.save();

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

							res.json({ newDatas: user, message: "Le profil a été mis à jour."});
						}

				} else {
					const eltUserSaved = await eltToUpdate.save();
					res.json(eltUserSaved);
				}

			} else {
				res.status(404).json(`item ${id} is undefined`);
			}

		}
	},

	deleteOne: async(req, res) => {
		const entity = req.params.entity;
		const TargetModel = getModelFromName(entity);

		if(!TargetModel) {
			res.status(404).json({error: `Model ${entity} not found`});
		} else {
			const id = req.params.id;
			const eltToDelete = await TargetModel.findByPk(id);

			if(eltToDelete) {
				await eltToDelete.destroy();
				res.json(`${eltToDelete} deleted`);
			} else {
				res.status(404).json(`${id} not found`);
			}
		}
	}
};

module.exports = crudController;