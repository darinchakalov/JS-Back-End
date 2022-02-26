const Ad = require("../models/Ad.js");

const create = function (headline, location, companyName, description) {
	return Ad.create({ headline, location, companyName, description });
};

const getAll = function () {
	return Ad.find().lean();
};

const adServices = {
	create,
	getAll,
};

module.exports = adServices;
