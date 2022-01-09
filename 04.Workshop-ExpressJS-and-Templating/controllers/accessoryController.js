const express = require("express");
const router = express.Router();
const accessoryService = require("../services/accessoryServices.js");

const renderPage = (req, res) => {
	res.render("accessory/create");
};

const createAccessory = (req, res) => {
	let { name, description, imageUrl } = req.body;
	accessoryService.create(name, description, imageUrl);
	res.redirect("/");
};

router.get("/create", renderPage);
router.post('/create', createAccessory)

module.exports = router;
