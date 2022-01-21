const mongoose = require("mongoose");

const initDB = function () {
	return mongoose.connect(
		"mongodb+srv://realestateuser:realestatepass@cluster0.ozv6x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
	);
};

module.exports = initDB;
