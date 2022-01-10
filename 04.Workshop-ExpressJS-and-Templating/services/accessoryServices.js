const Accessory = require("../models/Accessory.js");
const Cube = require("../models/Cube.js");

const create = function (name, description, imageUrl) {
	return Accessory.create({ name, description, imageUrl });
};

const getAll = function () {
	return Accessory.find({});
};

const attach = function (cubeId, accessoryId) {
	Cube.findById(cubeId).then((cube) => {
		Accessory.findById(accessoryId).then((accessory) => {
			cube.accessories.push(accessory);
			return cube.save();
		});
	});
};

let accessoryService = {
	create,
	getAll,
	attach,
};

module.exports = accessoryService;
