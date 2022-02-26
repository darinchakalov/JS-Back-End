const Ad = require("../models/Ad.js");
const User = require("../models/User.js");

const create = function (headline, location, companyName, description, author) {
	return Ad.create({ headline, location, companyName, description, author });
};

const getAll = function () {
	return Ad.find().lean();
};

const getOne = function (id) {
	return Ad.findById(id).populate("author").populate("candidates");
};

const apply = async function (adId, userId) {
	console.log("here1");
	try {
		let ad = await Ad.findById(adId);
		let user = await User.findById(userId);
		ad.candidates.push(user);
		return house.save();
	} catch (error) {
		return error;
	}
};

const edit = function (adId, ad) {
	return Ad.findByIdAndUpdate(adId, ad, { runValidators: true });
};

const adServices = {
	create,
	getAll,
	getOne,
	apply,
	edit,
};

module.exports = adServices;
