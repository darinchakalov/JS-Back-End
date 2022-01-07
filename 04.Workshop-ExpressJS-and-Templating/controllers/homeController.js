const express = require("express");
const router = express.Router();
const cubes = require("../config/database.json");

const renderHome = (req, res) => {
	res.render("index", { cubes });
};

router.get("/", renderHome);

module.exports = router;
