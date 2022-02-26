const Ad = require("../models/Ad.js");
const User = require("../models/User.js");

const create = function (headline, location, companyName, description, author) {
	return Ad.create({ headline, location, companyName, description, author });
};

const getAll = function () {
	return Ad.find().lean();
};

const getOne = function (id) {
	return Ad.findById(id).populate("author");
};

const getCandidates = function (id) {
	return Ad.findById(id).populate("candidates");
};

const apply = async function (adId, userId) {
	try {
		let ad = await Ad.findById(adId);
		ad.candidates.push(userId);
		return ad.save();
	} catch (error) {
		return error;
	}
};

const edit = function (adId, ad) {
	return Ad.findByIdAndUpdate(adId, ad, { runValidators: true });
};

const del = function (id) {
	return Ad.findByIdAndDelete(id);
};

const findFirstThree = function () {
	return Ad.find().lean().sort({ _id: 1 }).limit(3);
};

const getAllWithAuthor = function () {
	return Ad.find().populate("author");
};

const adServices = {
	create,
	getAll,
	getOne,
	apply,
	edit,
	del,
	getCandidates,
	findFirstThree,
	getAllWithAuthor,
};

module.exports = adServices;
