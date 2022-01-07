const express = require("express");
const router = express.Router();
const cubeService = require("../services/cubeService.js");
const cubes = require('../config/database.json')

const renderCreateCube = (req, res) => {
	res.render("create");
};

const createCube = (req, res) => {
	let { name, description, imageUrl, difficulty } = req.body;
	cubeService.create(name, description, imageUrl, difficulty);
	res.redirect("/cube/create");
};

const renderDetailsPage = (req, res) => {
    let currentId = req.params.id;
    let currentCube = cubes.find(c => c.id === currentId)
	res.render("details", currentCube);
};


router.get("/create", renderCreateCube);
router.post("/create", createCube);
router.get('/:id', renderDetailsPage)

module.exports = router;
