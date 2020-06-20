const fs = require('fs')

fs.readFile('tmp/one.txt', 'utf-8', (err, data) => {
    
    // how to get out of here!
    console.log(data)
    fs.readFile(`tmp/${data}`, 'utf-8', (err, data) => {
        console.log(data)
        fs.readFile(`tmp/${data}`, 'utf-8', (err, data) => {
            console.log(data) 
            
            //let's play with the contents that we just reached to!
            fs.writeFile(`tmp/${data}`, "Happy Ending", (err) => {
                console.log('Happy Ending!')
            })
        })
    })    
})