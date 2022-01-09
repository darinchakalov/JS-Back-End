const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
	id: mongoose.ObjectId,
	name: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
		validate:
			/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
	},
	desription: {
		type: String,
		required: true,
		maxlength: 100,
	},
	cubes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cube" }],
});

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
