// Environment variables
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Modules
const cors = require("cors");
const session = require("express-session");

// Express
const express = require("express");
const app = express();

app.use(express.json());

// CORS
app.use(cors({
	origin: FRONTEND_URL,
	credentials: true,
}));

// Session
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true, // empêche l'accès au cookie depuis du javascript côté front
		secure: process.env.NODE_ENV === "production", // HTTPS est nécessaire si l'on veut passer l'option à true
		maxAge: 1000 * 60 * 60 * 24, // durée de vie du cookie en milliseconds, ici ça donne 1 jour
	}
}));

app.use(express.static('./dist'));

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

// Catch-all: serve React app for any unmatched route (SPA support)
const path = require("path");
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// launch server
app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});
