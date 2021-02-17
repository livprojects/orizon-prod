/* eslint-disable no-undef */
// Environment variables
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

// Modules
const bodyParser = require("body-parser");
const session = require("express-session");

// Express
const express = require("express");
const app = express();

app.use(bodyParser.json());

// Session
app.use(session({
		secret: "g5g48er7gergGER",
		resave: true,
		saveUninitialized: true,
		cookie: {
			httpOnly: true, // empêche l'accès au cookie depuis du javascript côté front
			secure: false, // HTTPS est nécessaire si l'on veut passer l'option à true
			maxAge: 1000 * 60 * 60 * 24, // durée de vie du cookie en milliseconds, ici ça donne 1 jour
		}
	}));


	app.use((req, res, next) => {
		// on autorise explicitement le domaine du front
		res.header("Access-Control-Allow-Origin", "https://o-rizon.herokuapp.com");
		// on autorise le partage du cookie
		res.header("Access-Control-Allow-Credentials", true);
		// on autorise le partage de ressources entre origines
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");

		next();
	});


app.use(express.static('./dist'));
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// FS : ACCESS TO UPLOAD FOLDER (READ)
// Allowing only read permission 
// const fs = require('fs'); 

// // Test the read permission 
// fs.access('./uploads/', fs.constants.R_OK, (err) => { 
// console.log('\n> Checking Permission for reading the file'); 
// if (err) 
// 	console.error('No Read access'); 
// else
// 	console.log('File can be read'); 
// }); 

// POST management
app.use(express.urlencoded({
	extended: true
}));

// Sanitizer 
const sanitizeData = require("./app/middlewares/sanitizeMiddleware");
app.use(sanitizeData);

// router
const router = require("./app/router");
app.use(router);

// launch server
app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});