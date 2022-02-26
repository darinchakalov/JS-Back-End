const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	skills: {
		type: String,
		required: true,
	},
	myAds: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Ad",
		},
	],
});

userSchema.pre("save", function (next) {
	bcrypt
		.hash(this.password, 10)
		.then((hash) => {
			this.password = hash;
			next();
		})
		.catch((err) => {
			throw new Error("This happened when trying to hash the password: ", err);
		});
});

userSchema.method("confirmPassword", function (password) {
	return bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
