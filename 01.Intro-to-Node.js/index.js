const http = require("http");
const port = 3000;
const handlers = require('./handlers')

const app = http.createServer((req, res) => {
	for (const handler of handlers) {
		if (!handler(req, res)) {
			break;
		}
	}
});

app.listen(port);

console.log(`App is running on port 3000...`);
