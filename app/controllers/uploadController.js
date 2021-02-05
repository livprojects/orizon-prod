const multer = require('multer');
const helpers = require("../middlewares/imageFilterMiddleware");

const uploadController = {

	avatar: async(req, res) => {

        const idString = req.params.idString;

		var storage =   multer.diskStorage({
			destination: function(req, file, cb) {
				cb(null, 'uploads/');
			},

			// By default, multer removes file extensions so let's add them back
			filename: function(req, file, cb) {
				cb(null, file.fieldname);
			}
		});

		var upload = await multer({ storage : storage, fileFilter: helpers.imageFilter }).single(idString);
		upload(req,res,function(err) {
			if(err) {
                console.log(err)
				return res.end("Error uploading file.");
            }
            // console.log(filename.split('.').pop();)
            console.log(req)
			res.redirect('http://localhost:8080/profile');
		});
    },
};

module.exports = uploadController;