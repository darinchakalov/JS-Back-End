const fs = require("fs");
const fsPromise = require('fs/promises')

//This reads the whole file and loads it in the RAM. If the file is big however we need to use streams
//this is synchronus reading
let text = fs.readFileSync('index.html', 'utf-8')
// console.log(text);

//this is asynchronus
let aText  = fs.readFile('./index.html', 'utf-8', (err, text) => {
    if (err) {
        console.log(err);
    }

    //console.log(text);
})

//Async with Promise
fsPromise.readFile('./index.html', 'utf-8')
    .then(text => {
        console.log(text);
    })

//Async with async/await
async function readFile(path) {
    let text = await fs.readFile(path, 'utf-8')
    console.log(text);
}

readFile('./index.html')