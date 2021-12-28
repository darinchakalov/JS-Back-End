const fs = require("fs");
const zlib = require("zlib");

let readStream = fs.createReadStream("./index.html");
let writeStream = fs.createWriteStream("index.gz");

let gzip = zlib.createGzip();

//piping the output of the readstream into the gzip and then the output into the writable stream
readStream.pipe(gzip).pipe(writeStream);