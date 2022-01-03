const express = require("express");
const handlebars = require("express-handlebars");
const fs = require("fs");
const breeds = require("./data/breeds.json");
const cats = require("./data/cats.json");
const bodyParser = require("body-parser");
const multer = require("multer");
const uuid = require("uuid");

const app = express();
const storage = multer.diskStorage({
	destination: "./content/images",
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

app.use("/content", express.static("content"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (err, req, res, next) {
	console.log("This is the invalid field ->", err.field);
	next(err);
});

app.engine(
	"hbs",
	handlebars.engine({
		extname: "hbs",
	})
);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
	res.render("home", {
		cats,
	});
});

app.get("/addBreed", function (req, res) {
	res.render("addBreed");
});

app.get("/addCat", (req, res) => {
	res.render("addCat", {
		breeds,
	});
});

app.post("/addBreed", (req, res) => {
	breeds.push(req.body.breed);
	let result = JSON.stringify(breeds, null, 2);
	fs.writeFileSync("./data/breeds.json", result);
	res.redirect("/");
});

app.post("/addCat", upload.single("upload"), (req, res) => {
	const newCat = {
		id: uuid.v4(),
		name: req.body.name,
		description: req.body.description,
		breed: req.body.breed,
		img: req.file.destination + "/" + req.file.filename,
	};
	cats.push(newCat);
	let result = JSON.stringify(cats, null, 2);
	fs.writeFileSync("./data/cats.json", result);
	res.redirect("/");
});

app.get("/edit/:id", upload.single("upload"), (req, res) => {
	let currentID = req.params.id;
	const currentCat = cats.find((cat) => cat.id === currentID);
    console.log(currentCat);
	res.render("editCat", currentCat);
});

app.post("/edit/:id", upload.single("upload"), (req, res) => {
	let currentID = req.params.id;
	const currentCat = cats.find((cat) => cat.id === currentID);
	currentCat.name = req.body.name;
	currentCat.description = req.body.description;
	currentCat.breed = req.body.breed;
	console.log(req.body);
	if (req.file !== undefined) {
		currentCat.img = req.file.destination + "/" + req.file.filename;
	}
	let result = JSON.stringify(cats, null, 2);
	fs.writeFileSync("./data/cats.json", result);
	res.redirect("/");
});

app.get("/shelter/:id", (req, res) => {
    let currentID = req.params.id;
    let currentCat = cats.find((cat) => cat.id === currentID)
    res.render('catShelter', currentCat)
})

app.post("/shelter/:id", (req, res) => {
    let currentID = req.params.id;
    let currentCat = cats.find((cat) => cat.id === currentID)
    let catIndex = cats.indexOf(currentCat)
    cats.splice(catIndex, 1)
    let result = JSON.stringify(cats, null, 2);
    fs.writeFileSync("./data/cats.json", result)
    res.redirect('/')
})

app.listen(5000, () => {
	console.log("Server is running on http://localhost:5000");
});
