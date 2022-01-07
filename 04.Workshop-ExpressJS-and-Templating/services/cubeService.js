const Cube = require("../models/Cube.js");
const cubesDB = require("../config/database.json");
const fs = require("fs");

const create = (name, description, imageUrl, difficulty) => {
	let cube = new Cube(name, description, imageUrl, difficulty);
    console.log(cube);
	cubesDB.push(cube);
	let result = JSON.stringify(cubesDB, null, 2);

	fs.writeFileSync("./config/database.json", result);
};

let cubeService = {
    create
}

module.exports = cubeService;
