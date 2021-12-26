const eventBus = require("./eventBus.js");

eventBus.subscribe("arewethereyet", function (town) {
	console.log("yeeee we arrived in", town);
});

eventBus.subscribe("NewTest", (firstPerson, secondPerson) => {
	console.log("Meet", firstPerson, 'and', secondPerson);
});

eventBus.publish("arewethereyet", 'Sofia');
eventBus.publish("NewTest", 'Pesho', 'Ivan');
