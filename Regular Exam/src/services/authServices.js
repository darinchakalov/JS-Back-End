const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const { SECRET } = require("../config/constants.js");

const register = function (email, password, skills) {
	return User.create({ email, password, skills });
};

const login = async function (email, password) {
	try {
		let user = await User.findOne({ email: email });
		let isPasswordCorrect = await user.confirmPassword(password);
		if (isPasswordCorrect) {
			return user;
		}
	} catch (error) {
		throw new Error("Username or password are incorrect", error);
	}
};

const userExists = function (email) {
	return User.exists({ email });
};

const createToken = function (user) {
	const payload = {
		id: user._id,
		username: user.username,
	};
	return jwt.sign(payload, SECRET);
};

const getUser = function (id) {
	return User.findById(id);
};

const authServices = {
	register,
	login,
	userExists,
	createToken,
	getUser,
};

module.exports = authServices;
