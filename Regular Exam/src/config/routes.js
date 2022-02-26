const homeController = require("../controllers/homeController.js");
const authController = require("../controllers/authController.js");
const adsController = require("../controllers/adsController.js");
const searchController = require("../controllers/searchController.js");
const nonExistingController = require("../controllers/nonExistingController.js");

module.exports = (app) => {
	app.use(homeController);
	app.use(authController);
	app.use(adsController);
	app.use(searchController);
	app.use(nonExistingController);
};
