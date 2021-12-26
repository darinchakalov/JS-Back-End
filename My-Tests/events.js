const events = require("events");
const eventsEmmitter = new events.EventEmitter();

let eventName = "greetings";

class Publisher {
	constructor() {}

	publishMessage() {
		let message = "yo";
		eventsEmmitter.emit(eventName, message);
	}
}

class Subscriber {
	constructor() {
		eventsEmmitter.on(eventName, (greeting) => {
			console.log("Someone send me a greeting: " + greeting);
		});
	}
}


const publisher = new Publisher();
const subscriber = new Subscriber();

publisher.publishMessage();