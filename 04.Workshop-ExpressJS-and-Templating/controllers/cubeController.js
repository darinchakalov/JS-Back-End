const express = require("express");
const router = express.Router();
const cubeService = require("../services/cubeService.js");

const renderCreateCube = (req, res) => {
	res.render("create");
};

const createCube = (req, res) => {
	let { name, description, imageUrl, difficulty } = req.body;
	cubeService.create(name, description, imageUrl, difficulty);
	res.redirect("/cube/create");
};

router.get("/create", renderCreateCube);
router.post("/create", createCube);

module.exports = router;
