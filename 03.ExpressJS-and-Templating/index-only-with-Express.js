const express = require("express");
const path = require("path");

const app = express();

app.use('/content', express.static('./content'))

app.get("/", (req, res) => {
	//first option to get the file path
	res.sendFile("./views/home/index.html", {
		root: __dirname,
	});
});

app.get("/addBreed", (req, res) => {
	//second option to get the file path
	res.sendFile(__dirname + "/views/addBreed.html");
});

app.get("/addCat", (req, res) => {
	//third option to get the file path (PREFERRED OPTION AS IT MOST FAIL SAFE)
	let absolutePath = path.join(__dirname, "/views/addCat.html");
	res.sendFile(absolutePath);
});

app.listen(5000, () => {
	console.log("Server is running on http://localhost:5000");
});
