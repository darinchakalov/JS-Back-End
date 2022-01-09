const Accessory = require("../models/Accessory.js");

const create = function (name, description, imageUrl) {
	return Accessory.create({ name, description, imageUrl });
};

let accessoryService = {
	create,
};

module.exports = accessoryService;
