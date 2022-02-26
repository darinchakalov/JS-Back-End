const router = require("express").Router();
const validator = require("validator");

const authServices = require("../services/authServices.js");
const { TOKEN_COOKIE_NAME } = require("../config/constants.js");
const { isAuth, isGuest } = require("../middlewares/authMiddleware.js");

const renderLoginPage = (req, res) => {
	res.render("login");
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await authServices.login(email, password);
		let token = await authServices.createToken(user);
		res.cookie(TOKEN_COOKIE_NAME, token, {
			httpOnly: true,
		});

		res.redirect("/");
	} catch (error) {
		res.locals.error = error.message;
		return res.render("login");
	}
};

const renderRegisterPage = (req, res) => {
	res.render("register");
};

const registerUser = async (req, res) => {
	let { email, password, repeatPassword, skills } = req.body;
	if (!email || !password || !repeatPassword || !skills) {
		res.locals.error = "All fields are required";
		return res.render("register");
	}
	if (!validator.isEmail(email)) {
		res.locals.error = "Please use a valid email";
		return res.render("register");
	}
	if (password.length < 5) {
		res.locals.error = "Password should be atleast 5 characters long";
		return res.render("register");
	}

	if (password !== repeatPassword) {
		res.locals.error = "Passwords do not match!";
		return res.render("register");
	}
	if (await authServices.userExists(email)) {
		res.locals.error = "Email address already exists!";
		return res.render("register");
	}

	try {
		await authServices.register(email, password, skills);

		let user = await authServices.login(email, password);
		let token = await authServices.createToken(user);
		res.cookie(TOKEN_COOKIE_NAME, token, {
			httpOnly: true,
		});

		res.redirect("/");
	} catch (error) {
		req.locals.error = error;
		res.render("register");
	}
};

const logoutUser = (req, res) => {
	res.clearCookie(TOKEN_COOKIE_NAME);
	res.redirect("/");
};

router.get("/login", isGuest, renderLoginPage);
router.post("/login", loginUser);
router.get("/register", isGuest, renderRegisterPage);
router.post("/register", registerUser);
router.get("/logout", isAuth, logoutUser);

module.exports = router;
