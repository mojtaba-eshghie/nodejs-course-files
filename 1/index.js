const fs = require('fs')

const fileText = fs.readFileSync("tmp/sample.txt", 'utf-8')
const message = `File contents (read on ${Date.now()}): \n${fileText}`

fs.writeFileSync('tmp/output.txt', message)
