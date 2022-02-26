const Ad = require("../models/Ad.js");

const create = function (headline, location, companyName, description) {
	return Ad.create({ headline, location, companyName, description });
};

const adServices = {
	create,
};

module.exports = adServices;
