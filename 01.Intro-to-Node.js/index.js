const http = require("http");
const fs = require("fs");
const port = 3000;
const formidable = require("formidable");
const path = require("path");

const storageService = require("./services/storageService.js");

const app = http.createServer((req, res) => {
	switch (req.url) {
		case "/":
			let content = fs.readFileSync("./views/home/index.html", "utf-8");
			res.writeHead(200, {
				"Content-Type": "text/html",
			});
			let cats = storageService.readCats();

			let mappedCats = cats.map(
				(cat) => `<li>
			<img src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png" alt="Black Cat">
			<h3>${cat.name}</h3>
			<p><span>Breed: </span>${cat.breed}</p>
			<p><span>Description: </span>${cat.description}</p>
			<ul class="buttons">
				<li class="btn edit"><a href="">Change Info</a></li>
				<li class="btn delete"><a href="">New Home</a></li>
			</ul>
		</li>`
			);

			content = content.replace("{{cats}}", mappedCats);
			res.write(content);
			res.end();
			break;
		case "/content/styles/site.css":
			let css = fs.readFileSync("./content/styles/site.css");
			res.writeHead(200, {
				"Content-Type": "text/css",
			});
			res.write(css);
			res.end();
			break;
		case "/add-cat":
			if (req.method === "GET") {
				fs.readFile("./views/addCat.html", "utf-8", (err, data) => {
					if (err) {
						res.writeHead(404, {
							"Content-Type": "text/plain",
						});
						res.write("Page not found!");
						return res.end();
					}
					res.writeHead(200, {
						"Content-Type": "text/html",
					});

					let breeds = storageService.readBreeds();

					let mappedBreeds = breeds.map((x) => `<option value=${x}>${x}</option>`);

					data = data.replace("{{breeds}}", mappedBreeds);

					res.write(data);
					res.end();
				});
			} else if (req.method === "POST") {
				let form = new formidable.IncomingForm();
				const uploadFolder = path.join(__dirname, 'content', 'images')

				form.uploadDir = uploadFolder;
				console.log(form);

				form.parse(req, (err, fields, files) => {
					storageService
						.saveCat(fields)
						.then(() => {
							res.end();
						})
						.catch((err) => {
							console.log("err");
							console.log(err);
						});
				});
				//Creating a redirect after the form is filled
				res.writeHead(302, {
					Location: "/",
				});
				res.end();
			}

			break;
		case "/add-breed":
			if (req.method === "GET") {
				fs.readFile("./views/addBreed.html", (err, data) => {
					if (err) {
						res.writeHead(404, {
							"Content-Type": "text/plain",
						});
						res.write("Page not found!");
						return res.end();
					}
					res.writeHead(200, {
						"Content-Type": "text/html",
					});
					res.write(data);
					res.end();
				});
			} else if (req.method === "POST") {
				let form = new formidable.IncomingForm();
				form.parse(req, (err, fields) => {
					storageService
						.saveBreed(fields)
						.then(() => {
							res.end();
						})
						.catch((err) => {
							console.log(err);
						});
				});
			}
			res.writeHead(302, {
				Location: "/",
			});
			// res.end()
			break;
		default:
			res.statusCode = 404;
			res.end();
			break;
	}
});

app.listen(port);

console.log(`App is running on port 3000...`);
