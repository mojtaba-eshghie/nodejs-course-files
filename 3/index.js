const http = require('http')
const url = require('url')
const fs = require('fs')

const slugify = require('slugify');

const replaceTemplate = require(`${__dirname}/modules/replaceTemplate.js`)



//I think this is not a sane approach since the file may have not still been read
// but the api request is still going to return the empty string (it has already
// been initialized to '')
/*
fs.readFile(`${__dirname}/data.json`, (err, data) => {
    jsonDataFileContents = data
})
*/


//template loader engine
const jsonDataFileContents = fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
const dbObject = JSON.parse(jsonDataFileContents)
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')


const slugs = dbObject.map((el => slugify(el.productName, {
    lower:true
})));

// TODO: FIXME: 

// This is going to be a simple http server
const server = http.createServer((req, res) => {
    
    
    const {query, pathname} = url.parse(req.url, true)
    //console.log(queryObj.query.name)
    


    
    
    
    if (pathname === '/' || pathname === '/overview') {
        //Overview page
        /*
        console.log('responding with the db json file as a string (json header type)')
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(jsonDataFileContents)
        */

        const cardsHtml = dbObject.map((element) => {
            //map loops through the elements of the array and does the callback function for each and every of them
            return replaceTemplate(templateCard, element)            
        })

        var cardsTogether = ''
        cardsHtml.map((element) => {
            cardsTogether = cardsTogether.concat(element)
        })
        var finalOverviewPage = templateOverview.replace(/{%PRODUCT_CARDS}/g, cardsTogether)


        
        

        
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        
        res.end(finalOverviewPage)
        

        
        



    } else if (pathname === '/product') {
        //Product page
        const product = dbObject[query.id]
        var output = replaceTemplate(templateProduct, product)
        
        res.end(output)


    } else if (pathname === '/api') {
        //API
        const productData = JSON.parse(jsonDataFileContents)
        res.writeHead(200, {
            'Content-type': 'application/json',
        })
        res.end(jsonDataFileContents)



    } else {
        //404
        // You should always send the headers before you send the response (res.end)!
        res.writeHead(404, {
            'Content-type': 'text/html',
            'MadeUp-Header': 'Shit!'
        })
        res.end('<h1>404</br>The page you are looking for could not be found</h1>')
    }



    //if no res.end method gets invoked at the end of this callback, then, the browser does not really know 
    // what to do with the invoked url.
    //res.end("hello from the server!")
})





server.listen(80, '127.0.0.1', () => {
    console.log("server is listening!")  
})