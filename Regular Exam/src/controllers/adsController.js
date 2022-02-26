const router = require("express").Router();

const adServices = require("../services/adServices.js");

const renderCreatePage = (req, res) => {
	res.render("create");
};

const createAd = async (req, res) => {
	let { headline, location, companyName, description } = req.body;

	try {
		await adServices.create(headline, location, companyName, description);
		res.redirect("/all-ads");
	} catch (error) {
		res.locals.error = error.message;
		res.render("create");
	}
};

router.get("/create", renderCreatePage);
router.post("/create", createAd);

module.exports = router;
