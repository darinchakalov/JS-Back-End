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

const renderAllAdsPage = async (req, res) => {
	try {
		let ads = await adServices.getAll();
		res.render("all-ads", { ads });
	} catch (error) {
		res.locals.error = error.message;
		res.render("all-ads");
	}
};

router.get("/create", renderCreatePage);
router.post("/create", createAd);
router.get("/all-ads", renderAllAdsPage);

module.exports = router;
