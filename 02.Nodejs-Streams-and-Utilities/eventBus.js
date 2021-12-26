const subscribers = {};

function subscribe(eventType, callback) {
	if (!subscribers[eventType]) {
		subscribers[eventType] = [];
	}

	subscribers[eventType].push(callback);
}

function publish(eventType, ...params) {
    if (!subscribers[eventType]) {
        return;
    }

    subscribers[eventType].forEach(f => f.apply(null, params));

    //to unsubscribe
    return function () {
        subscribers[eventType] = subscribers[eventType].filter(f => f != callback)
    }
}

const eventBus = {
    subscribe,
    publish
};

module.exports = eventBus;
