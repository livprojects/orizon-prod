const multer = require('multer');
const helpers = require("../middlewares/imageFilterMiddleware");

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads/');
	},

	// By default, multer removes file extensions so let's add them back
	filename: function(req, file, cb) {
		cb(null, file.fieldname);
	}
});

const upload = multer({ storage: storage, fileFilter: helpers.imageFilter });

const uploadController = {

	avatar: (req, res) => {

		const idString = req.params.idString;

		upload.single(idString)(req, res, function(err) {
			if (err) {
				console.error(err);
				return res.status(400).json({ error: "Error uploading file." });
			}
			console.debug(req);
			res.redirect(`${process.env.FRONTEND_URL}/profile`);
		});
	},
};

module.exports = uploadController;
