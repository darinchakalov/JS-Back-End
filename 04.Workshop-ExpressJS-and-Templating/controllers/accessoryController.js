const express = require("express");
const router = express.Router();

const renderPage = (req, res) => {
	res.render("createAccessory");
};

router.get('/create', renderPage);

module.exports = router;