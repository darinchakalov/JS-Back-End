const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
	id: mongoose.ObjectId,
	name: {
		type: String,
		required: true,
	},
	desription: {
		type: String,
		required: true,
		maxlength: 100,
	},
	imageUrl: {
		type: String,
		required: true,
		validate: /^https?/,
	},
	difficulty: {
		type: Number,
		required: true,
		min: 1,
		max: 6,
	},
	accessories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Accessory" }],
});

const Cube = mongoose.model('Cube', cubeSchema)

module.exports = Cube;