const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const connectionStr = "mongodb://localhost:27017";
const client = new MongoClient(connectionStr, { useUnifiedTopology: true });

client.connect().then(() => {
	console.log("Connected");

	const db = client.db("myDB");
	const collection = db.collection("courses");

    collection.insertOne({"name": "Express JS"})

	return collection.find({}).toArray()
}).then((data) => {
    console.log(data);
});
