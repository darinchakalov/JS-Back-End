const router = require("express").Router();

const renderLoginPage = (req, res) => {
	res.render("auth/login");
};

const renderRegisterPage = (req, res) => {
	res.render("auth/register");
};

router.get("/login", renderLoginPage);
router.get("/register", renderRegisterPage);

module.exports = router;
