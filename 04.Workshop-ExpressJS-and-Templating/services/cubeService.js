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

const getAll = () => {
	return cubesDB;
}

const search = (text, from , to) => {
	let result = cubesDB;
	if (text) {
		result = result.filter(c => c.name.toLowerCase().includes(text.toLowerCase()))
	}

	if (from) {
		result = result.filter(c => c.difficulty >= from)
	}

	if (to) {
		result = result.filter(c => c.difficulty <= to)
	}
	return result;
}

let cubeService = {
    create,
	getAll,
	search
}

module.exports = cubeService;
