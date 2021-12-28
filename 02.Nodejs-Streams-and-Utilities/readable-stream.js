const fs = require("fs");

const readableStream = fs.createReadStream("./index.html", {
	encoding: "utf-8",
	highWaterMark: 1024, //this is the buffer size
});

//this will write the data in a file named output.txt
const writableStream = fs.createWriteStream("output.txt");

readableStream.on("data", function (chunk) {
	console.log("New chunk");
	// console.log(chunk);

	//everytime there is a new chunk we can write it in a writable stream
	writableStream.write(chunk);
});

readableStream.on("end", () => {
	console.log("Stream ended");
	writableStream.end();
});
