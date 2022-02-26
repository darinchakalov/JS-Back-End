const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
	headline: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	companyName: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	usersApplied: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

const Ad = mongoose.model("Ad", adSchema);

module.exports = Ad;
