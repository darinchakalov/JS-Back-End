const router = require("express").Router();

const adServices = require("../services/adServices.js");

const renderCreatePage = (req, res) => {
	res.render("create");
};

const createAd = async (req, res) => {
	let { headline, location, companyName, description } = req.body;

	try {
		await adServices.create(headline, location, companyName, description, res.user.id);
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

const renderDetailsPage = async (req, res) => {
	let id = req.params.id;

	try {
		let adData = await adServices.getOne(id);
		let ad = adData.toObject();
		let isAuthor = res.user?.id == ad.author._id;
		let numberOfCandidates = ad.candidates.length;
		res.render("details", { ...ad, isAuthor, numberOfCandidates });
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

const renderEditPage = async (req, res) => {
	try {
		let ad = await adServices.getOne(req.params.id);
		res.render("edit", ad);
	} catch (error) {
		c;
	}
};

const editAd = async (req, res) => {
	try {
		let ad = req.body;
		await adServices.edit(req.params.id, ad);
		res.redirect(301, `/details/${req.params.id}`);
	} catch (error) {
		res.locals.error = error.message;
		res.render("edit");
	}
};

const applyForJob = async (req, res) => {
	console.log("here");
	try {
		await adServices.apply(req.params.id, res.user.id);
		res.redirect(301, `/details/${req.params.id}`);
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

router.get("/create", renderCreatePage);
router.post("/create", createAd);
router.get("/all-ads", renderAllAdsPage);
router.get("/details/:id", renderDetailsPage);
router.get("/edit/:id", renderEditPage);
router.post("/edit/:id", editAd);
router.get("/aply/:id", applyForJob);

module.exports = router;
