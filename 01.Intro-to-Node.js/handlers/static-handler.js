const url = require("url");
const fs = require("fs");
const path = require("path");

function getContentType(url) {
    console.log(url);
	if (url.endsWith("css")) {
		return "text/css";
	} else if (url.endsWith("html")) {
		return "text/html";
	} else if (url.endsWith("png")) {
		return "image/png";
	} else if (url.endsWith('ico')) {
        return 'image/svg+xml';
    }else if (url.endsWith("jpg")) {
		return "image/jpg";
	} else if (url.endsWith("js")) {
		return "text/javascript";
	}
}

module.exports = (req, res) => {
	const pathname = url.parse(req.url).pathname;
    console.log('here');

	if (pathname.startsWith("/content") && req.method === "GET") {
        
		fs.readFile(`./${pathname}`, (err, data) => {
			if (err) {
				console.log(err);
				console.log('err');

				res.writeHead(404, {
					"Content-Type": "text/plain",
				});
				res.write("Page not found");
				res.end();
				return;
			}

            console.log(pathname);
            res.writeHead(200, {
                "Content-Type": getContentType(pathname),
            })

            res.write(data);
            res.end();
		});
	} else {
		true;
	}
};
