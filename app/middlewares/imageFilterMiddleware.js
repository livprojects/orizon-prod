const imageFilter = (req, file, cb) => {
	if (!file.mimetype.match(/^image\/(jpeg|png)$/)) {
		req.fileValidationError = "Only JPEG and PNG files are allowed.";
		return cb(new Error("Only JPEG and PNG files are allowed."), false);
	}
	cb(null, true);
};

exports.imageFilter = imageFilter;
