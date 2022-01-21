const express = require("express");
const initDB = require("./config/db-config.js");
const handlerbars = require("express-handlebars");
const router = require("./config/routes.js");

const app = express();

router(app);

app.engine(
	"hbs",
	handlerbars.engine({
		extname: "hbs",
	})
);

app.set("view engine", "hbs");
app.use("/static", express.static("static"));

initDB()
	.then(() => {
		app.listen(3000, console.log(`The application is running at http://localhost:3000`));
	})
	.catch((err) => {
		console.log("Application init failed: ", err);
	});
