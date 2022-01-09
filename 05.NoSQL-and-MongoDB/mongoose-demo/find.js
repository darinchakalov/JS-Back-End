const initDB = require('./dbConfig.js');
const Person = require('./models/Person.js');

initDB();

// Person.find()
//     .then(people => {
//         people.forEach(x => console.log(x.greet()))
//     })


// Person.find().then(people => {
//     people.forEach(x => console.log(x.isExcellent))
// })

async function findByGrade() {
    let students = await Person.find({}).where('grade').gt(4)
    students.forEach(x => console.log(`${x.name}, age ${x.age}, grade ${x.grade}`))
}
findByGrade()