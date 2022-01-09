const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/myDB";

const initDB = () => mongoose.connect(connectionString);

module.exports = initDB;
