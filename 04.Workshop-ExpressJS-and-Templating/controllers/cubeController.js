const express = require("express");
const router = express.Router();
const cubeService = require("../services/cubeService.js");
const cubes = require("../config/database.json");

const renderCreateCube = (req, res) => {
	res.render("create");
};

const createCube = (req, res) => {
	let { name, description, imageUrl, difficulty } = req.body;
	cubeService
		.create(name, description, imageUrl, difficulty)
		.then(res.redirect("/"))
		.catch((err) => {
			res.status(400);
			console.log("Well this happened: ", err);
		});
};

const renderDetailsPage = (req, res) => {
	let id = req.params.id;
	cubeService
		.getSingle(id)
		.then((cube) => {
			res.render("details", cube);
		})
		.catch((err) => {
			res.status(400);
			console.log(`Well this went wrong: `, err);
		});
};

router.get("/create", renderCreateCube);
router.post("/create", createCube);
router.get("/details/:id", renderDetailsPage);

module.exports = router;
