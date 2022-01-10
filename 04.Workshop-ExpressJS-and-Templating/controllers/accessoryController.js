const router = require("express").Router();
const accessoryService = require("../services/accessoryServices.js");
const cubeService = require("../services/cubeService.js");

const renderCreatePage = (req, res) => {
	res.render("accessory/create");
};

const createAccessory = (req, res) => {
	let { name, description, imageUrl } = req.body;
	accessoryService.create(name, description, imageUrl);
	res.redirect("/");
};

const renderAttachPage = (req, res) => {
	let id = req.params.id;
	let cubeRequest = cubeService.getSingle(id);
	let accessoriesRequest = accessoryService.getAll();

	Promise.all([cubeRequest, accessoriesRequest])
		.then((data) => {
			let [cube, accessories] = [...data]
			res.render("accessory/attach", { cube, accessories });
		})
		.catch((err) => {
			console.log(`Well this went wrong: `, err);
		});
};

const attach = (req, res) => {
	let cubeId = req.params.id;
	let accessoryId = req.body.accessory;
	accessoryService.attach(cubeId, accessoryId)
	res.redirect(`/cube/details/${cubeId}`)
}

router.get("/create", renderCreatePage);
router.post("/create", createAccessory);
router.get("/attach/:id", renderAttachPage);
router.post('/attach/:id', attach)

module.exports = router;
