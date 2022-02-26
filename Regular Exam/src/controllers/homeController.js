const adServices = require("../services/adServices.js");

const router = require("express").Router();

const renderHomePage = async (req, res) => {
	let ads = await adServices.findFirstThree();
	res.render("home", { ads });
};

router.get("/", renderHomePage);

module.exports = router;
