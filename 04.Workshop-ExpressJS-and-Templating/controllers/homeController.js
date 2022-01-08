const express = require("express");
const router = express.Router();
const cubeService = require("../services/cubeService.js");

const renderHome = (req, res) => {
	let cubes = cubeService.getAll()
	res.render("index", { cubes });
};

const search = (req, res) => {
	let { search, from, to } = req.query;

	let cubes = cubeService.search(search, from, to);
	res.render("index", { cubes });
};

router.get("/", renderHome);
router.get("/search", search);

module.exports = router;
