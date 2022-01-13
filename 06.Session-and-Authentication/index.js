const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cookieParser());
app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: "asdadsad9asdadas0sadasdsa0",
		cookie: {},
	})
);

app.get("/cookie", (req, res) => {
	// A simple example on how to set cookie (multiple can be set) using Cookie Parser
	res.cookie("myCookie", "myCookeValue");
	res.sendFile(__dirname + "/views/home.html");
});

app.get("/set-session/:name", (req, res) => {
	req.session.user = req.params.name;
	res.send("set session");
});

app.get("/get-session", (req, res) => {
	console.log(req.session);
	res.send("get session");
});

app.get("/bcrypt", (req, res) => {
	const saltRounds = 9;
	let password = "test";

	bcrypt
		.genSalt(saltRounds)
		.then((salt) => {
			return bcrypt.hash(password, salt);
		})
		.then((hash) => {
			console.log(hash);
			res.send(hash);
		});
});

app.get("/bcrypt/verify/:password", (req, res) => {
	let hash = "$2b$09$DQ5reTnXu1JHzZewc.4wvePYaGmFpaQpEu9FxPfpiDPcaU61uHXp.";

	bcrypt.compare(req.params.password, hash).then((result) => {
		console.log(result);
		res.send(result);
	});
});

app.get("/jwt", (req, res) => {
	let userId = 201;
	let username = "testuser";

	const payload = { userId, username };
	let options = { expiresIn: "1d" };
	let secret = "MySuperSecret";
	let token = jwt.sign(payload, secret, options);
	res.send(token)
});

app.get('/token/verify', (req, res) => {
	let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwMSwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImlhdCI6MTY0MjA0MDEyNywiZXhwIjoxNjQyMTI2NTI3fQ.TCSX54gZkWIW0_NHGp4W5SLSCIA7FHklUkT7SYPRHjk';
	let secret = "MySuperSecret";
	const decodedToken = jwt.verify(token, secret)

	res.send(decodedToken)
})

app.listen(5000, console.log.bind(console, "App is running on http://localhost:5000"));
