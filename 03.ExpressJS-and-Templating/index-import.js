import express from "express";
import { engine } from "express-handlebars";
import { readFile } from "fs/promises";
import bodyParser from "body-parser";

const breeds = JSON.parse(await readFile("./data/breeds.json"));

const app = express();
app.use("/content", express.static("content"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine(
	"hbs",
	engine({
		extname: "hbs",
	})
);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/addBreed", (req, res) => {
	res.render("addBreed");
});

app.get("/addCat", (req, res) => {
	res.render("addCat", {
		breeds,
	});
});

app.post("/addCat", function (req, res) {
    console.log(res.body);
	res.setHeader("Content-Type", "text/plain");
	res.write("you posted:\n");
	res.end(JSON.stringify(req.body, null, 2));
});

app.listen(5000, () => {
	console.log("Server is running on http://localhost:5000");
});
