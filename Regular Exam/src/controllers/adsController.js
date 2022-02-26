const router = require("express").Router();

const adServices = require("../services/adServices.js");
const authServices = require("../services/authServices.js");

const { isGuest, isAuth } = require("../middlewares/authMiddleware.js");

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
		let isAuthor = res.user?.id == adData.author._id;
		let numberOfCandidates = adData.candidates.length;
		let isApplied = adData.candidates.some((user) => user == res.user?.id);
		let candidatesData = await adServices.getCandidates(id);
		let allCandidates = candidatesData.candidates.map((x) => {
			return {
				email: x.email,
				skills: x.skills,
			};
		});
		res.render("details", { ...ad, isAuthor, numberOfCandidates, isApplied, allCandidates: allCandidates });
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
		res.redirect(`/details/${req.params.id}`);
	} catch (error) {
		res.locals.error = error.message;
		res.render("edit");
	}
};

const deleteAd = async (req, res) => {
	try {
		await adServices.del(req.params.id);
		res.redirect("/all-ads");
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

const applyForJob = async (req, res) => {
	try {
		await adServices.apply(req.params.id, res.user.id);
		res.redirect(`/details/${req.params.id}`);
	} catch (error) {
		res.locals.error = error.message;
		res.render("details");
	}
};

router.get("/create", isAuth, renderCreatePage);
router.post("/create", isAuth, createAd);
router.get("/all-ads", renderAllAdsPage);
router.get("/details/:id", renderDetailsPage);
router.get("/edit/:id", isAuth, renderEditPage);
router.post("/edit/:id", isAuth, editAd);
router.get("/delete/:id", isAuth, deleteAd);
router.get("/apply/:id", isAuth, applyForJob);

module.exports = router;
