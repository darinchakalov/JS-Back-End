const express = require("express");
const router = express.Router();
const cubes = require('../config/database.json')

const renderDetailsPage = (req, res) => {
    let currentId = req.params.id;
    let currentCube = cubes.find(c => c.id === currentId)
	res.render("details", currentCube);
};

router.get("/details/:id", renderDetailsPage);

module.exports = router;
