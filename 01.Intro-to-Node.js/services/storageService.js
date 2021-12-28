const cats = require("../data/cats.json");
const breeds = require("../data/breeds.json");
const fs = require("fs/promises");

const saveCat = (data) => {
	cats.push(data);

	let result = JSON.stringify(cats, "", 2);

	return fs.writeFile("./data/cats.json", result);
};

const saveBreed = (data) => {
	// console.log(data.breed);
    breeds.push(data.breed);

	console.log(data);
	let result = JSON.stringify(breeds, '', 2);

	return fs.writeFile("./data/breeds.json", result);
};

const readBreeds = () => {
	return breeds;
};

const readCats = () => {
    return cats
}

const storageService = {
	saveCat,
	saveBreed,
	readBreeds,
    readCats
};

module.exports = storageService;
