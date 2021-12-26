const events = require('events');
const eventEmitter = new events.EventEmitter();

//using on instead of subscribe
eventEmitter.on('customEvent', (first, second) => {
    console.log('First', first);
    console.log('Second', second);
})

//using emit instead of publish
eventEmitter.emit('customEvent', 'Pesho', 'Gosho')
