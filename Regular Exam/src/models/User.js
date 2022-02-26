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
		minlength: [5, "Password should be atleast 5 characters long"],
	},
	skills: {
		type: String,
		required: true,
		maxlength: [40, "Skills cannot be more than 40 characters long"],
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
