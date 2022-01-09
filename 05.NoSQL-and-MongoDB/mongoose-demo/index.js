const initDB = require('./dbConfig.js');
const Person = require('./models/Person.js');

initDB()
    .then(() => {
        //First way to create new DB recordq
        // let person = new Person();
        // person.name = 'Darin';
        // person.age = 32;

        // person.save()
        //     .then(() => {
        //         console.log('Person saved');
        //     })

        //Second way to create new DB record
        Person.create({
            name: 'Vanio',
            age: 22,
            grade: 8
        })
            .then(person => {
                console.log('Person created');
                console.log(person);
            })

    })