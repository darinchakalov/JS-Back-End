const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
	headline: {
		type: String,
		required: true,
		minlength: [4, "Headline should be atleast 4 characters long"],
	},
	location: {
		type: String,
		required: true,
		minlength: [8, "Location should be atleast 8 characters long"],
	},
	companyName: {
		type: String,
		required: true,
		minlength: [3, "Company name should be atleast 3 characters long"],
	},
	description: {
		type: String,
		required: true,
		maxlength: [40, "Description cannot be more than 40 characters long"],
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	candidates: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

const Ad = mongoose.model("Ad", adSchema);

module.exports = Ad;
