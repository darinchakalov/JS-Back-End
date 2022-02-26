const adServices = require("../services/adServices.js");

const router = require("express").Router();

const renderSearchPage = (req, res) => {
	res.render("search");
};

const searchAds = async (req, res) => {
	let searchString = req.body;

	try {
		let allAds = await adServices.getAllWithAuthor();
		let searchResult = allAds.filter((x) => x.author.email.includes(searchString.search));
		let ads = searchResult.map((x) => {
			return {
				headline: x.headline,
				companyName: x.companyName,
			};
		});
		console.log(ads);
		res.render("search", { ads });
	} catch (error) {
		res.locals.error = error.message;
		res.render("search");
	}
};

router.get("/search", renderSearchPage);
router.post("/search", searchAds);

module.exports = router;
